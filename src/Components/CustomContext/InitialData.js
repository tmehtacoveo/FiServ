/* 
Before you edit:

When editing the 'InitialData', make sure to delete keys 'profile_selected' and 'context_data' in your localStorage to see the changes. 

To access localStorage:

Developer tools > Application > Storage > LocalStorage

*/

// DONOT CHANGE
export const KEY_NAME_PROFILE_SELECTED = "profile_selected_v2";
export const KEY_NAME_CONTEXT_DATA = "context_data_v2";

export const InitialData = [
  {
    name: "Anonymous",
    profile:
      "https://icon-library.com/images/anonymous-user-icon/anonymous-user-icon-2.jpg",
    context: [],
  },
  {
    name: "George Clooney",
    email: "gclooney@coveo.com",
    profile:
      "https://i.dailymail.co.uk/1s/2020/02/25/21/25192116-8044079-image-a-52_1582666217852.jpg",
    context: [
      {
        active: true,
        keyName: "employment",
        keyValue: "investment",
        customQRF: false,
      },
      {
        active: true,
        keyName: "purchase_history",
        keyValue: "pods",
        customQRF: false,
      },
    ],
  },
  {
    name: "Aishwarya Rai",
    email: "arai@coveo.com",
    profile:
      "https://i.pinimg.com/564x/26/81/18/26811817dd18a4304ff92acbfeba0e82.jpg",
    context: [
      {
        active: true,
        keyName: "employment",
        keyValue: "barista",
        customQRF: false,
      },
      {
        active: true,
        keyName: "purchase_history",
        keyValue: "",
        customQRF: false,
      },
    ],
  },
];
