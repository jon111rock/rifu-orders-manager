let fakeData = [
  {
    _id: 0,
    user: {
      _id: 0,
      name: "謝小育",
      address: "桃園市桃園區民安路60號",
      phone_number: "0975308911",
    },
    oid: "H2205127",
    date: "2021/05/09",
    completed_date: "2021/05/20",
    type: "自取",
    state: "已完成",
    detail: [
      {
        _id: 12321312,
        count: 2,
        item: {
          _id: 1,
          name: "草莓三明治",
          price: 25,
        },
      },
      {
        _id: 123211312,
        count: 2,
        item: {
          _id: 2,
          name: "巧克力三明治",
          price: 30,
        },
      },
    ],
  },
  {
    _id: 1,
    user: {
      _id: 1,
      name: "王小姐",
      address: "彰化縣和美鎮彰美路三段2段B棟",
      phone_number: "0975308911",
    },
    oid: "2205241",
    date: "2021/05/23",
    completed_date: "2021/05/24",
    type: "宅配",
    state: "已出貨",
    detail: [
      {
        _id: 12321312,
        count: 5,
        item: {
          _id: 1,
          name: "草莓三明治",
          price: 25,
        },
      },
      {
        _id: 123211312,
        count: 2,
        item: {
          _id: 3,
          name: "抹茶厚片",
          price: 45,
        },
      },
    ],
  },
];

export default fakeData;
