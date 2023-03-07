import testAvatar from "../assets/img/User_opt.jpg";
import testCommentAvatar from "../assets/img/pseudoCommentAvatar_opt.png";
import testImg01 from "../assets/img/postsImg01_opt.jpg";
import testImg02 from "../assets/img/postsImg02_opt.jpg";
import testImg03 from "../assets/img/postsImg03_opt.jpg";

const userData = {
  userAvatar: testAvatar,
  name: "Natali Romanova",
  email: "email@example.com",
  userPosts: [
    {
      id: "1",
      image: testImg01,
      description: "Ліс",
      comments: {
        amountOfComments: 8,
        comments: [],
      },
      amountOfLikes: 153,
      imgLocation: "Ukraine",
    },
    {
      id: "2",
      image: testImg02,
      description: "Захід Сонця на Чорному Морі",
      comments: {
        amountOfComments: 3,
        comments: [
          {
            id: "1stPic00000001",
            owner: { name: "XBOX", avatar: testCommentAvatar },
            text: "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
            date: "09 июня, 2020 | 08:40"
          },
          {
            id: "1stPic00000002",
            owner: { name: "Natali Romanova", avatar: testAvatar },
            text: "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
            date: "09 июня, 2020 | 09:14"
          },
          {
            id: "1stPic00000003",
            owner: { name: "XBOX", avatar: testCommentAvatar },
            text: "Thank you! That was very helpful!",
            date: "09 июня, 2020 | 09:20"
          },
        ],
      },
      amountOfLikes: "200",
      imgLocation: "Ukraine",
    },
    {
      id: "3",
      image: testImg03,
      description: "Старий будинок у Венеції",
      comments: {
        amountOfComments: "50",
        comments: [],
      },
      amountOfLikes: "200",
      imgLocation: "Italy",
    },
  ],
};

export default userData;
