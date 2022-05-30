let fakeData = [
  {
    index: 0,
    name: "謝小育",
    address: "桃園市桃園區民安路60號",
    phone_number: "0975308911",
    order: {
      id: "H2205127",
      date: "2021/05/09",
      completed_date: "2021/05/20",
      type: "自取",
      content: [
        {
          id: 12321312,
          count: 2,
          item: {
            id: 1,
            name: "草莓三明治",
            price: 25,
          },
          total: 50,
        },
        {
          id: 123211312,
          count: 2,
          item: {
            id: 2,
            name: "巧克力三明治",
            price: 30,
          },
          total: 60,
        },
      ],
      state: "已完成",
    },
    funds: 1000,
    deposit: 500,
    remaining_funds: 500,
  },
  {
    index: 1,
    name: "王小姐",
    address: "彰化縣和美鎮彰美路三段2段B棟",
    phone_number: "0975308911",
    order: {
      id: "2205241",
      date: "2021/05/23",
      completed_date: "2021/05/24",
      type: "宅配",
      content: [
        {
          id: 12321312,
          count: 5,
          item: {
            id: 1,
            name: "草莓三明治",
            price: 25,
          },
          total: 125,
        },
        {
          id: 123211312,
          count: 2,
          item: {
            id: 3,
            name: "抹茶厚片",
            price: 45,
          },
          total: 90,
        },
      ],
      state: "已出貨",
    },
    funds: 1000,
    deposit: 500,
    remaining_funds: 500,
  },
];

export default fakeData;
