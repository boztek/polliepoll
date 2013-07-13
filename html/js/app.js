App = Ember.Application.create();

App.Router.map(function() {
  this.resource('pollies');
  this.route('battle');
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
  setupController: function (controller, model) {
      this._super(controller, model);
      this.controllerFor('battle').resetClowns();
  }
});

App.BattleController = Ember.ArrayController.extend({
    twoRandomClownIDs: function () {
        var n_pollies = 4;
        var firstId = Math.ceil(Math.random() * n_pollies);
        var secondId = Math.ceil(Math.random() * n_pollies);
        while (secondId === firstId) {
            secondId = Math.ceil(Math.random() * n_pollies);
        }
        return [firstId, secondId];
    },
    resetClowns: function () {
        var clownIds = this.twoRandomClownIDs();
        var firstClown = App.Pollie.find(clownIds[0]);
        var secondClown = App.Pollie.find(clownIds[1]);
        this.set('firstClown', firstClown);
        this.set('secondClown', secondClown);
    },
    topScoreClown: function () {
        var maxIndex = 0;
        this.getEach('score').reduce(function (max, score, index) {
            if (score > max) {
                maxIndex = index;
                return score;
            }
            else {
                return max;
            }
        }, 0);
        var topPollie = App.Pollie.find(maxIndex);
        return topPollie;
    }.property('@each.score')
});

App.ClownController = Ember.ObjectController.extend({
    needs: ['battle'],
    pickClown: function (clown) {
        clown.incrementProperty('score');
        this.get('controllers.battle').resetClowns();
    }
});

App.Store = DS.Store.extend({
    revision: 12,
    adapter: 'DS.FixtureAdapter'
});

App.Pollie = DS.Model.extend({
    name: DS.attr('string'),
    score: DS.attr('number'),
    picture: DS.attr('string')
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
