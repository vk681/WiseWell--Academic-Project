import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import EventMap from "../components/EventMap";
import Card1 from "../components/Card1";
import useFetch from "../components/hooks/useFetch";
import Filter from "../components/Filter";

export default function IndexPage() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const initialCategory = queryParams.get("category") || "";
  const initialMin = queryParams.get("min") || "";
  const initialMax = queryParams.get("max") || "";

  const [category, setCategory] = useState(initialCategory);
  const [min, setMin] = useState(initialMin);
  const [max, setMax] = useState(initialMax);

  const url = category
    ? `/getEventsBytype?categories=${category}&min=${min || 0}&max=${
        max || 100
      }`
    : "/getEventsBytype";

  const { data: eventsData, loading, error, reFetch } = useFetch(url);

  const handleFilterChange = (newCategory, newMin, newMax) => {
    setCategory(newCategory);
    setMin(newMin);
    setMax(newMax);
    reFetch();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex w-4/5 h-full ml-24 fixed">
      <div className="relative w-3/5 h-full flex flex-col py-4">
        <div className="relative">
          <Filter
            category={category}
            min={min}
            max={max}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="flex flex-col overflow-y-auto mt-4 gap-2">
          {eventsData.map((event, index) => (
            <Card1 key={index} event={event} />
          ))}
        </div>
      </div>
      <div className="w-2/5 border p-4">
        <div className="h-full rounded-md">
          <EventMap events={eventsData} />
        </div>
      </div>
    </div>
  );
}

// getUserProductsList: expressAsyncHandler(async (req, res) => {
//   try {
//     const userId = req.query.userId;
//     const { catId } = req.params;
//     const userID = new mongoose.Types.ObjectId(userId);
//     console.log("customr product page details : ",catId,userID);
//     const user = await User.findOne({ _id: userID }, { _id: 0, location: 1 });

//     if (!user || !user.location) {
//       throw new Error('User location not found');
//     }

//     const radiusInKm = 10;
//     const radiusInRadians = radiusInKm / 6378.1;

//     const products = await ShopOwner.aggregate([

//       {
//         $geoNear: {
//           near: {
//             type: 'Point',
//             coordinates: user.location.coordinates
//           },
//           distanceField: 'distance',
//           maxDistance: radiusInRadians * 6378.1 * 1000,
//           spherical: true,
//           query: {
//             isBlock: false,
//           },
//         },
//       },
//       {
//         $addFields: {
//           distanceInKilometers: {
//             $divide: ['$distance', 1000],
//           },
//         },
//       },

//       {
//         $lookup: {
//           from: 'products',
//           localField: 'username',
//           foreignField: 'shopOwnerId',
//           as: 'products',
//         },
//       },
//       {
//         $unwind: '$products'
//       },
//       {
//         $match: {
//           'products.categoryId': catId,
//           'products.isDeleted' :false
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           name: 1,
//           number: 1,
//           email: 1,
//           address: 1,
//           location: "$location.coordinates",
//           createdAt: 1,
//           distanceInKm: "$distanceInKilometers",
//           productId: "$products._id",
//           shopOwnerUname: "$products.shopOwnerId",
//           categoryId: "$products.categoryId",
//           caption: "$products.caption",
//           description: "$products.description",
//           price: "$products.price",
//           imgNames: "$products.imgNames",
//           productCreatedAt: "$products.createdAt",
//         },
//       },
//     ]);

//     console.log("result of userpage products after aggrgation : ",products);
//     return res.status(200).json({
//       status: "success",
//       products,
//     });
//   } catch (error) {
//     console.error(error);
//     console.error("Error fetching all posts:", error);
//     res.status(500).json({
//       status: "error",
//       message: "Internal server error",
//     });
//     }
//
//   })
