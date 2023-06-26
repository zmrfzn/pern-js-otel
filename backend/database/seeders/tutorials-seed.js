'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const dummyJSON = [
      {
        "title": "React18",
        "description": "The Beginners guide!",
        "published": true,
        "createdAt": "2022-12-20 12:56:52.286+05:30",
        "updatedAt": "2022-12-20 12:56:52.286+05:30",
        "id": "23541257-719c-4c0b-8849-ec6f9975df95",
        "author":"",
        "category":1
      },
      {
        "title": "Fire on Fire!",
        "description": "Sam Smith",
        "published": false,
        "createdAt": "2022-12-20 12:57:10.755+05:30",
        "updatedAt": "2022-12-20 12:57:10.755+05:30",
        "id": "7b857865-b969-46f1-9221-698d9088297f",
        "author":"",
        "category":6
      },
      {
        "title": "Mockingbirds",
        "description": "Eminem",
        "published": false,
        "createdAt": "2022-12-20 12:57:23.694+05:30",
        "updatedAt": "2022-12-20 12:57:23.694+05:30",
        "id": "7f1d3fe4-6456-4619-aa0e-794dfa5dc6e3",
        "author":"",
        "category":6
      },
      {
        "title": "Lost Skeleton Returns Again!",
        "description": "Exposure of tooth",
        "published": true,
        "createdAt": "2022-12-20 12:57:35.611+05:30",
        "updatedAt": "2022-12-20 12:57:35.611+05:30",
        "id": "fc4684cc-78d2-434b-9596-f506e3b0f1d8",
        "author":"",
        "category":6
      },
      {
        "title": "Forced to Kill!",
        "description": "The untold story",
        "published": true,
        "createdAt": "2022-12-20 12:57:45.975+05:30",
        "updatedAt": "2022-12-20 12:57:45.975+05:30",
        "id": "64e10527-cb8a-4a8f-930e-396db5492f46",
        "author":"",
        "category":6
      },
      {
        "title": "Lost Skeleton",
        "description": "Finding of tooth",
        "published": true,
        "createdAt": "2022-12-20 12:58:31.253+05:30",
        "updatedAt": "2022-12-20 12:58:31.253+05:30",
        "id": "bd1be822-e6a6-4ae0-92b5-134f70e49849",
        "author":"",
        "category":6
      },
      {
        "title": "React Native ",
        "description": "The Intro",
        "published": false,
        "createdAt": "2022-12-20 12:58:39.408+05:30",
        "updatedAt": "2022-12-20 12:58:39.408+05:30",
        "id": "42a70d73-d242-4622-b7da-849ceb7e6aea",
        "author":"",
        "category":1
      },
      {
        "title": "The broken leg",
        "description": "Story of a femur",
        "published": true,
        "createdAt": "2022-12-20 12:57:02.876+05:30",
        "updatedAt": "2022-12-20 14:22:22.704+05:30",
        "id": "fb01f094-6585-47ff-ae6b-9813961ef021",
        "author":"",
        "category":6
      },
      {
        "title": "Solid JS",
        "description": "The Alter ego of React",
        "published": false,
        "createdAt": "2022-12-20 14:22:45.812+05:30",
        "updatedAt": "2022-12-20 14:22:52.707+05:30",
        "id": "01e2cace-ec91-4b90-a7bc-40b3b4b8ff8f",
        "author":"",
        "category":1
      }
    ]    
     
    await queryInterface.bulkInsert('tutorials',dummyJSON,{});
 
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('tutorials',null,{});
  }
};
