// EVERY seeder file
'use strict';

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spot-images'
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert(options, [
    {
      spotId:1,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-21409981/original/a8fa243d-dac8-4238-93e5-f7aa33072ff8.jpeg",
      preview: true
    },
    {
      spotId:1,
      url: "https://a0.muscache.com/im/pictures/323b2430-a7fa-44d7-ba7a-6776d8e682df.jpg",
      preview: false
    },
    {
      spotId:1,
      url: "https://a0.muscache.com/im/pictures/61a2ffde-4f2c-437b-aed8-4aca39b27cd5.jpg",
      preview: false
    },
    {
      spotId:1,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-21409981/original/19e82eb8-4125-461c-b832-a45b5482fbdf.jpeg",
      preview: false
    },
    {
      spotId:1,
      url: "https://a0.muscache.com/im/pictures/eab257ae-6d2e-46c5-befd-7265777ba9b8.jpg",
      preview: false
    },
    
    {
      spotId:2,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-686120619798893603/original/36deb313-d961-4cea-b9e1-045bb5907ec7.jpeg",
      preview: true
    },
    {
      spotId:2,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-686120619798893603/original/3885e18b-32af-4df7-8ebb-a536bb6bcda2.jpeg",
      preview: false
    },
    {
      spotId:2,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-686120619798893603/original/633e26d7-456a-45e8-a718-a7f27c32ff7f.jpeg",
      preview: false
    },
    {
      spotId:2,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-686120619798893603/original/665186b6-1a82-434e-bf79-35fef4563f9d.jpeg",
      preview: false
    },
    {
      spotId:2,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-686120619798893603/original/9013b3f1-1772-43bc-8e46-439b6f1b53ce.jpeg",
      preview: false
    },
    {
      spotId:3,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-740520829652124473/original/0e453947-a99c-4f2f-b7ce-753606a62f53.jpeg",
      preview: true
    },
    {
      spotId:3,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-740520829652124473/original/65643bae-9d7f-4fe0-8957-dab48e398fe9.jpeg",
      preview: false
    },
    {
      spotId:3,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-740520829652124473/original/d914fcf2-7817-4ab3-ba35-91a153796ef3.jpeg",
      preview: false
    },
    {
      spotId:3,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-740520829652124473/original/fe670751-932b-4b7b-b4ce-4c252bcc7c5b.jpeg",
      preview: false
    },
    {
      spotId:3,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-740520829652124473/original/3b931ba7-c1c7-482d-873c-3051f3892ac1.jpeg",
      preview: false
    },
    {
      spotId:4,
      url: "https://a0.muscache.com/im/pictures/8ca53c2b-d4da-4d84-864e-e7beff551048.jpg",
      preview: true
    },
    {
      spotId:4,
      url: "https://a0.muscache.com/im/pictures/d6ef0772-fa49-4c15-baf6-cdd92959c875.jpg",
      preview: false
    },
    {
      spotId:4,
      url: "https://a0.muscache.com/im/pictures/2a2d1d70-28b0-4bb3-bcad-7df02f885256.jpg",
      preview: false
    },
    {
      spotId:4,
      url: "https://a0.muscache.com/im/pictures/42c0d3c1-521d-41f8-b623-c958948742d3.jpg",
      preview: false
    },
    {
      spotId:4,
      url: "https://a0.muscache.com/im/pictures/bc268bb5-2a36-47b6-88bb-cd2a621d2771.jpg",
      preview: false
    },
    {
      spotId:5,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-50872630/original/3d4b9250-2b75-43dc-9ad9-d3504bf0f1c4.jpeg",
      preview: true
    },
    {
      spotId:5,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-50872630/original/9b59211f-15ee-4a76-b3be-56a9c08fa190.jpeg",
      preview: false
    },
    {
      spotId:5,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-50872630/original/08d717c8-1f9b-43d6-b2d0-692fd259c57e.jpeg",
      preview: false
    },
    {
      spotId:5,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-50872630/original/213b1bb9-4eab-4b47-9524-d8bac27dc501.jpeg",
      preview: false
    },
    {
      spotId:5,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-50872630/original/d6655fb2-8159-4657-b358-f07cc3c5e9a1.jpeg",
      preview: false
    },
    {
      spotId:6,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-711480859079610656/original/d9269f3f-a7fa-4032-ab0c-554b5229ceb7.jpeg",
      preview: true
    },
    {
      spotId:6,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-711480859079610656/original/301d2682-c332-4faa-be0e-082b4b00ac5f.jpeg",
      preview: false
    },
    {
      spotId:6,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-711480859079610656/original/12bb7c96-ddb6-4e13-b026-ccddc2667c16.jpeg",
      preview: false
    },
    {
      spotId:6,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-711480859079610656/original/b3428c09-72cb-4beb-b98b-e76f48c7ed2b.jpeg",
      preview: false
    },
    {
      spotId:6,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-711480859079610656/original/c3dd0c14-7fe3-42d5-8f1a-ffb315d2ef9b.jpeg",
      preview: false
    },
    {
      spotId:7,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-708865711652798286/original/d628aa29-a30c-4594-bf58-02896d9d8c91.jpeg",
      preview: true
    },
    {
      spotId:7,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-708865711652798286/original/28e7d143-6fba-4267-b52e-70359ca2def5.jpeg",
      preview: false
    },
    {
      spotId:7,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-708865711652798286/original/7ec7f817-9c63-4bc8-81d3-75afb0873979.jpeg",
      preview: false
    },
    {
      spotId:7,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-708865711652798286/original/56696fde-16cf-4030-b891-1f44e6ac0cff.jpeg",
      preview: false
    },
    {
      spotId:7,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-708865711652798286/original/dac63831-1579-498a-a040-d770914f5b6c.jpeg",
      preview: false
    },
    {
      spotId:8,
      url: "https://a0.muscache.com/im/pictures/da9516c7-04a3-4787-a82e-b58c3ac5e865.jpg",
      preview: true
    },
    {
      spotId:8,
      url: "https://a0.muscache.com/im/pictures/cbf68fa1-d6bf-4414-9c67-98e493f1b029.jpg",
      preview: false
    },
    {
      spotId:8,
      url: "https://a0.muscache.com/im/pictures/32bfb0d7-1d94-40e7-b171-7674f169dd44.jpg",
      preview: false
    },
    {
      spotId:8,
      url: "https://a0.muscache.com/im/pictures/631c8926-9ed6-4226-b5c4-c5452e84e6ba.jpg",
      preview: false
    },
    {
      spotId:8,
      url: "https://a0.muscache.com/im/pictures/0c7b0963-b498-47ba-bd79-4b934381cd8c.jpg",
      preview: false
    },
    {
      spotId:9,
      url: "https://a0.muscache.com/im/pictures/ff35ada8-ecd4-4277-a127-78dee14c70ee.jpg",
      preview: true
    },
    {
      spotId:9,
      url: "https://a0.muscache.com/im/pictures/ea3bce54-c882-4e31-9c8b-af26f89d9173.jpg",
      preview: false
    },
    {
      spotId:9,
      url: "https://a0.muscache.com/im/pictures/f48be95d-10bb-4213-9da7-d28b065d19c2.jpg",
      preview: false
    },
    {
      spotId:9,
      url: "https://a0.muscache.com/im/pictures/5865312e-6384-42d7-8dee-808ff88a5f18.jpg",
      preview: false
    },
    {
      spotId:9,
      url: "https://a0.muscache.com/im/pictures/3d36553d-075a-446d-8182-972251842092.jpg",
      preview: false
    },
    {
      spotId:10,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-53256465/original/0ab4cddb-abf0-4609-929f-20aaabe8940d.jpeg",
      preview: true
    },
    {
      spotId:10,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-53256465/original/a3a6d577-5c0f-4648-a458-68d7fa18ed98.jpeg",
      preview: false
    },
    {
      spotId:10,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-53256465/original/772f9805-947e-4ed3-9526-93007f99fe79.jpeg",
      preview: false
    },
    {
      spotId:10,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-53256465/original/69cbfc87-f616-49ef-835c-135424c68ea0.jpeg",
      preview: false
    },
    {
      spotId:10,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-53256465/original/9fd57ed9-29eb-4611-a98e-e4efa27b2dbe.jpeg",
      preview: false
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spot-images'
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options)
  }
};
