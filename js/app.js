App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
  this.resource('pollies'); // resource vs route, this refers to the Router object
  this.route('battle'); // because this isn't related to a thing/noun/data object, it's not a resource
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('battle');
  }
});
// App.Router.reopen({
//   location: 'history'
// });

App.Store = DS.Store.extend({
  revision: 12,
  adapter: 'DS.FixtureAdapter'
});

App.Pollie = DS.Model.extend({
  name: DS.attr('string'),
  score: DS.attr('number'),
  picture: DS.attr('string')
});

App.PolliesRoute = Ember.Route.extend({
  model: function () {
    return App.Pollie.find();
  }
});

App.BattleController = Ember.ObjectController.extend({
  init: function () {
    this._super();
    var firstId = Math.ceil(Math.random() * 4);
    var secondId = Math.ceil(Math.random() * 4);
    while (secondId === firstId) {
      secondId = Math.ceil(Math.random() * 4);
    }
    this.first  = App.Pollie.find(firstId);
    this.second = App.Pollie.find(secondId);
  },
  addPoint: function (pollie) {
    var currentScore = pollie.get('score');
    pollie.set('score', currentScore + 1);
    // refresh choices
    var firstId = Math.ceil(Math.random() * 4);
    var secondId = Math.ceil(Math.random() * 4);
    while (secondId === firstId) {
      secondId = Math.ceil(Math.random() * 4);
    }
    this.set('first', App.Pollie.find(firstId));
    this.set('second', App.Pollie.find(secondId));
  },
});

Ember.Handlebars.helper('image', function (value) {
  if (value !== undefined) {
    return new Handlebars.SafeString('<img src="images/' +value+ '" />');
  }
  else {
    return '';
  }
});

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
