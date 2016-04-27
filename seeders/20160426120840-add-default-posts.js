'use strict';

var date = new Date();
date.toISOString();

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        username : 'user1',
        password :'secret',
        salt : 'sy98dhw2ijbdekjbcads',
        createdAt : date,
        updatedAt : date
      },
      {
        username : 'user2',
        password :'secret',
        salt : 'sdajkhd89y12389hdioucheqw',
        createdAt : date,
        updatedAt : date
      }
    ]),

    queryInterface.bulkInsert('Posts', [
      {
        url : 'http://lorempixel.com/800/480/city/1',
        title : 'Heaven',
        link : 'www.callmejoe.net',
        info : 'Cupcake ipsum dolor sit amet gingerbread. Jelly pastry biscuit jujubes gingerbread fruitcake croissant toffee sugar plum. Bear claw liquorice carrot cake halvah. Apple pie bear claw pie. Chocolate cake lollipop. Pastry fruitcake cake jelly lollipop. Sweet jelly chocolate bar.',
        createdAt : date,
        updatedAt : date,
        UserId : 1
      },
      {
        url : 'http://lorempixel.com/800/480/city/2',
        title : 'Earth Birth',
        link : 'www.callmejoe.net',
        info : 'Toffee caramels icing fruitcake halvah candy canes powder marzipan ice cream. Oat cake fruitcake tiramisu jelly beans lollipop topping sesame snaps cotton candy sweet. Caramels jelly beans liquorice cake jelly-o. Fruitcake gummies bonbon chocolate cake chocolate bar. Cake marshmallow sweet jelly ice cream cotton candy icing pie fruitcake. Sesame snaps bonbon candy canes lemon drops cookie. Carrot cake donut dessert sweet. Cotton candy liquorice jelly beans tart bear claw cake soufflé donut danish. Icing powder jelly-o lemon drops oat cake macaroon cake soufflé.',
        createdAt : date,
        updatedAt : date,
        UserId : 1
      },
      {
        url : 'http://lorempixel.com/800/480/city/3',
        title : 'Sessions',
        link : 'www.callmejoe.net',
        info : 'Sweet gummies bonbon sesame snaps sweet. Pie ice cream oat cake gummi bears icing chocolate bar sesame snaps jelly beans. Pudding sweet roll gummies carrot cake. Danish brownie bear claw. Cake sweet brownie muffin sugar plum cookie bonbon cupcake candy canes. Dragée chupa chups cookie sugar plum caramels cake gummies.',
        createdAt : date,
        updatedAt : date,
        UserId : 1
      },
      {
        url : 'http://lorempixel.com/800/480/city/4',
        title : 'Whale\'s and Rainbows',
        link : 'www.callmejoe.net',
        info : 'Bonbon icing jelly beans bear claw pudding cake gummi bears sesame snaps sugar plum. Sweet roll bear claw soufflé bear claw pastry croissant tiramisu sesame snaps marzipan. Liquorice chupa chups sweet toffee. Topping bonbon candy canes. Pie gummies chocolate cake dragée sugar plum cake sweet. Chocolate macaroon dessert halvah lollipop sesame snaps. Cake lemon drops sugar plum cheesecake oat cake liquorice brownie. Candy canes carrot cake marzipan jujubes sweet roll chocolate bar donut chocolate.',
        createdAt : date,
        updatedAt : date,
        UserId : 2
      },
      {
        url : 'http://lorempixel.com/800/480/city/5',
        title : 'Sunset Blvd',
        link : 'www.callmejoe.net',
        info : 'Toffee caramels icing fruitcake halvah candy canes powder marzipan ice cream. Oat cake fruitcake tiramisu jelly beans lollipop topping sesame snaps cotton candy sweet. Caramels jelly beans liquorice cake jelly-o. Fruitcake gummies bonbon chocolate cake chocolate bar. Cake marshmallow sweet jelly ice cream cotton candy icing pie fruitcake. Sesame snaps bonbon candy canes lemon drops cookie. Carrot cake donut dessert sweet. Cotton candy liquorice jelly beans tart bear claw cake soufflé donut danish. Icing powder jelly-o lemon drops oat cake macaroon cake soufflé.',
        createdAt : date,
        updatedAt : date,
        UserId : 2
      },
      {
        url : 'http://lorempixel.com/800/480/city/6',
        title : 'Waves of Clouds',
        link : 'www.callmejoe.net',
        info : 'Chupa chups jelly-o cake muffin oat cake bonbon donut chocolate croissant. Jelly-o dragée jelly cupcake topping macaroon ice cream chocolate cake. Gummies wafer croissant sweet pie jujubes liquorice. Muffin donut jujubes toffee candy liquorice cupcake sweet. Pastry muffin icing macaroon pastry gummies carrot cake. Carrot cake cheesecake lemon drops. Croissant candy pie halvah dragée gummi bears muffin.',
        createdAt : date,
        updatedAt : date,
        UserId : 2
      },
      {
        url : 'http://lorempixel.com/800/480/city/7',
        title : 'Secrets',
        link : 'www.callmejoe.net',
        info : 'Sweet gummies bonbon sesame snaps sweet. Pie ice cream oat cake gummi bears icing chocolate bar sesame snaps jelly beans. Pudding sweet roll gummies carrot cake. Danish brownie bear claw. Cake sweet brownie muffin sugar plum cookie bonbon cupcake candy canes. Dragée chupa chups cookie sugar plum caramels cake gummies.',
        createdAt : date,
        updatedAt : date,
        UserId : 2
      }
      ]
    )
  },

  down : function (queryInterface, Sequelize) {
    // queryInterface.bulkDelete('Users', [{
    //   first_name :'John'
    // }])
  }
};