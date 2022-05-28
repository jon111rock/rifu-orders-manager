const ordersData = [
  {
    index: 0,
    name: "謝小育",
    address: "桃園市桃園區民安路60號",
    phone_number: "0975308911",
    local_number: "03-331-3110",
    order: {
      id: "H2205127",
      date: "2021/05/09",
      completed_date: "2021/05/20",
      type: "自取",
      content: {
        草莓派對: "2",
        香濃巧克力: "9",
        新鮮蒜香奶油: "4",
      },
      state: "已完成",
    },
  },
  {
    index: 1,
    name: "王小姐",
    address: "彰化縣和美鎮彰美路三段2段B棟",
    phone_number: "0975308911",
    local_number: "04-7359823",
    order: {
      id: "2205241",
      date: "2021/05/23",
      completed_date: "2021/05/24",
      type: "宅配",
      content: {
        草莓派對: "2",
        香濃巧克力: "9",
        新鮮蒜香奶油: "4",
      },
      state: "已出貨",
    },
  },
];

export default ordersData;
