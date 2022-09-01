/* 
Before you edit:

When editing the 'InitialData', make sure to delete keys 'profile_selected' and 'context_data' in your localStorage to see the changes. 

To access localStorage:

Developer tools > Application > Storage > LocalStorage

*/


// DONOT CHANGE
export const KEY_NAME_PROFILE_SELECTED = 'profile_selected_v2';
export const KEY_NAME_CONTEXT_DATA = 'context_data_v2'


export const InitialData = [
  {
    name: "Anonymous",
    profile: "https://icon-library.com/images/anonymous-user-icon/anonymous-user-icon-2.jpg",
    context: [],
  },
  {
    name: "Oliver Hansen",
    email : "ohansen@coveo.com",
    profile: "https://static.toiimg.com/photo/68944342.cms",
    context: [
      {
        active: true,
        keyName: "employment",
        keyValue: "investment",
        customQRF: false,
      },
      {
        active: true,
        keyName: "age",
        keyValue: "60",
        customQRF: false,
      },
    ],
  },
  {
    name: "Van Henery",
    email : "vhenery@coveo.com",
    profile:
      "https://englishtribuneimages.blob.core.windows.net/gallary-content/2022/3/2022_3$largeimg_1116021257.JPG",
    context: [
      {
        active: true,
        keyName: "age",
        keyValue: "32",
        customQRF: false,
      },
      {
        active: true,
        keyName: "employment",
        keyValue: "insurance",
        customQRF: false,
      },
    ],
  },
];



