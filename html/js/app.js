App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
  this.resource('pollies'); // resource vs route, this refers to the Router object
  this.route('battle'); // because this isn't related to a thing/noun/data object, it's not a resource


});

App.Store = DS.Store.extend({
  revision: 12,
  adapter: 'DS.FixtureAdapter'
});

App.Pollie = DS.Model.extend({
  name: DS.attr('string'),
  score: DS.attr('number')
});

App.PolliesRoute = Ember.Route.extend({
  model: function () {
    return App.Pollie.find();
  }
});

App.BattleRoute = Ember.Route.extend({
  model: function () {
    return App.Pollie.find();
  },
  setupController: function(controller, model) {
    controller.set('debug', model.find(2));
  }
});
// App.BattleController = Ember.Controller.extend({
//   // players: [
//   //   {
//   //     id:0,
//   //     name: 'Kevin',
//   //     picture: 'kevin.png'
//   //   },
//   //   {
//   //     id: 1,
//   //     name: 'Tony',
//   //     picture: 'tony.png'
//   //   }
//   // ],
//   debug: 'jabanga'
// });

App.Pollie.FIXTURES = [
  {
    id: 1,
    name: 'Kevin',
    score: 0,
    picture: 'kevin.png'
  },
  {
    id: 2,
    name: 'Tony',
    score: 0,
    picture: 'tony.png'
  },
  {
    id: 3,
    name: 'Anthony',
    score: 0,
    picture: 'anthony.png'
  },
  {
    id: 4,
    name: 'Joe',
    score: 0,
    picture: 'joe.png'
  },
];
