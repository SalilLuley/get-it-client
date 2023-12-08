export const NETWORKING_CONTSTANTS = {
  BASE_URL: "http://localhost:2001/",
  SIGN_UP: "auth/login",
  AUTH: {
    VALIDATE_TOKEN: "auth/verify-token",
  },
  USER: {
    GET_MY_PROFILE: "users/get-my-profile",
    UPDATE: "users/update",
  },
  PARKING: {
    GET_ONE: "parking-spot/get-one/",
    GET_ALL: "parking-spot/get-all/",
    GET_ALL_AUTOCOMPLETE: "parking-spot/get-all-autcomplete",
    FILTER: {
      RENT: "parking-spot/filter",
    },
    CREATE: "parking-spot/create",
  },
  ORDERS: {
    GET_MY_ORDERS: "order/get-all",
    GET_MY_OWNER_ORDERS: "order/get-all-owner-orders",
    CREATE: "order/create",
    UPDATE: "order/update",
  },
};
