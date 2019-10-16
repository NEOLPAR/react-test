import typeToReducer from "type-to-reducer";

// Action Type
const BAR_TYPE = "BAR";

// Action
export const barActionCreator = () => ({
  type: BAR_TYPE,
  payload: fetch("/apiv2/results/get", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      organisationid: "fa287954-1105-4c4c-95e9-2ade7171214a",
      searchType: "sales"
    })
  }).then(function(res) {
    return res.json();
  })
});

// Reducer
export let barReducer = typeToReducer(
    {
        [BAR_TYPE]: {
            PENDING: () => ({
                isPending: true
            }),
            REJECTED: (state, action) => ({
                isRejected: true,
                isPending: false,
                error: action.payload
            }),
            FULFILLED: (state, action) => ({
                isFulfilled: true,
                isPending: false,
                data: action.payload
            })
        }
    },
    {}
);