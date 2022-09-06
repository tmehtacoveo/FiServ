/* 
Before you edit:

When editing the 'InitialData', make sure to delete keys 'profile_selected' and 'context_data' in your localStorage to see the changes. 

To access localStorage:

Developer tools > Application > Storage > LocalStorage

*/

export const InitialData = [
  {
    name: "Anonymous",
    profile: "https://icon-library.com/images/anonymous-user-icon/anonymous-user-icon-2.jpg",
    context: [],
  },
  {
    name: "Oliver O'Gorman",
    profile: "https://static.toiimg.com/photo/68944342.cms",
    context: [
      {
        active: true,
        keyName: "gas_usage",
        keyValue: "medical",
        customQRF: false,
      },
    ],
  },
  {
    name: "Gordon Ramsay",
    profile:
      "https://pbs.twimg.com/profile_images/1448696882746695683/Jp2_LEBL_400x400.jpg",
    context: [
      {
        active: true,
        keyName: "gas_usage",
        keyValue: "food",
        customQRF: false,
      },
    ],
  },
];



