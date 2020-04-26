let initialState = {
  basketItems: [
    {
      BasketItemId: 1,
      description: "Это прекрасный товар, который Вам обязательно стоит взять",
      imgSrc:
        "https://remontdoma24.ru/image/cache/data/ruchnoj-instrument-hoztovary/sadoviy-unstrument-i-inventar/vedra/65428-230x230.jpg",
      clicked: false,
    },
    {
      BasketItemId: 2,
      description: "Это прекрасный товар, который Вам обязательно стоит взять",
      imgSrc:
        "https://hailo.moscow/thumb/2/jXDp6iWcmPKzSiOvkaV2IQ/200r200/d/hailo_profiline_solid_0514-079_v_magazine_hailomoscow.jpg",
      clicked: false,
    },
    {
      BasketItemId: 3,
      description: "Это прекрасный товар, который Вам обязательно стоит взять",
      imgSrc:
        "https://suplbiz-a.akamaihd.net/media/cache/8d/bc/8dbc89845bdf0a9fb6174979ce950591.jpg",
      clicked: false,
    },
    {
      BasketItemId: 4,
      description: "Это прекрасный товар, который Вам обязательно стоит взять",
      imgSrc:
        "https://res.cloudinary.com/lmru/image/upload/f_auto,q_auto,w_278,h_278,c_pad,b_white,d_photoiscoming.png/LMCode/82402777.jpg",
      clicked: false,
    },
    {
      BasketItemId: 5,
      description: "Это прекрасный товар, который Вам обязательно стоит взять",
      imgSrc:
        "https://prorab01.ru/upload/w_512/448302da09724b314b3612ba5b8297d1.jpg",
      clicked: false,
    },
    {
      BasketItemId: 6,
      description: "Это прекрасный товар, который Вам обязательно стоит взять",
      imgSrc:
        "https://www.alternat.ru/upload/iblock/945/9459eba2a7bf682d267c7aff170f9e75.jpg",
      clicked: false,
    },
  ],
};

export const basketReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_BASKET":
      return {
        ...state,
        ...(state.basketItems[action.id - 1].clicked = !state.basketItems[
          action.id - 1
        ].clicked),
      };

    default:
      return state;
  }
};
