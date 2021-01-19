const fetch = require('node-fetch')
const d3 = require('d3')
const sortJson = require('sort-json')
const _ = {
  map: require('lodash/map'),
  uniqBy: require('lodash/uniqBy'),
  capitalize: require('lodash/capitalize'),
  each: require('lodash/each')
}
const Radar = require('../models/radar')
const Quadrant = require('../models/quadrant')
const Ring = require('../models/ring')
const Blip = require('../models/blip')
const GraphingRadar = require('../graphing/radar')
const MalformedDataError = require('../exceptions/malformedDataError')
const ExceptionMessages = require('./exceptionMessages')

const CsvSheet = function () {
  var self = {}

  self.buildFromJSON = function (data) {
    self.renderRadar(data)
  }

  self.displayErrorMessage = function (exception) {
    d3.selectAll('.loading').remove()
    var message = 'Oops! It seems like there are some problems with loading your data. '

    if (exception instanceof MalformedDataError) {
      message = message.concat(exception.message)
    } else {
      console.error(exception)
    }

    message = message.concat('<br/>', 'Please check <a href="https://info.thoughtworks.com/visualize-your-tech-strategy-guide.html#faq">FAQs</a> for possible solutions.')

    d3.select('body')
      .append('div')
      .attr('class', 'error-container')
      .append('div')
      .attr('class', 'error-container__message')
      .append('p')
      .html(message)

    return self
  }

  self.renderRadar = function (data) {
    try {
      var blips = _.map(data)

      document.title = 'Tech Radar'
      d3.selectAll('.loading').remove()

      var rings = _.map(_.uniqBy(blips, 'ring'), 'ring')
      var ringMap = {}
      var maxRings = 4

      _.each(rings, function (ringName, i) {
        if (i === maxRings) {
          throw new MalformedDataError(ExceptionMessages.TOO_MANY_RINGS)
        }
        ringMap[ringName] = new Ring(ringName, i)
      })

      var quadrants = {}
      _.each(blips, function (blip) {
        if (!quadrants[blip.quadrant]) {
          quadrants[blip.quadrant] = new Quadrant(_.capitalize(blip.quadrant))
        }
        quadrants[blip.quadrant].add(new Blip(blip.name, ringMap[blip.ring], blip.isnew === 'true', blip.topic, blip.description))
      })

      var radar = new Radar()
      _.each(quadrants, function (quadrant) {
        radar.addQuadrant(quadrant)
      })

      var size = (window.innerHeight - 133) < 620 ? 620 : window.innerHeight - 133

      new GraphingRadar(size, radar).init().plot()
    } catch (exception) {
      self.displayErrorMessage(exception)
    }
  }

  self.init = function () {
    var content = d3.select('body')
      .append('div')
      .attr('class', 'loading')
      .append('div')
      .attr('class', 'input-sheet')

    set_document_title()

    plotBanner(content)
    plotFooter(content)

    return self
  }

  return self
}

const CsvInput = function () {
  var self = {}

  self.build = function () {
    const sheet = CsvSheet()
    fetch('https://raw.githubusercontent.com/mariusbreivik/build-your-own-radar/master/data/radarinput.json')
      .then(response => response.json())
      .then(data => {
        sheet.init().buildFromJSON(sortJson(data, { ignoreCase: true, reverse: false, depth: 1 }))
      }).catch(err => console.log(err))
  }

  return self
}

// eslint-disable-next-line camelcase
function set_document_title () {
  document.title = 'Tech Radar'
}

function plotFooter (content) {
  content
    .append('div')
    .attr('id', 'footer')
    .append('div')
    .attr('class', 'footer-content')
    .append('p')
    .html('Based on <a href="https://github.com/thoughtworks/build-your-own-radar">ThoughtWorks Radar</a>.')
}

function plotBanner (content, text) {
  content.append('div')
    .attr('class', 'input-sheet__banner')
    .html(text)
}

module.exports = CsvInput
