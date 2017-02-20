import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './loginform.html';


$('.toggle').on('click', function() {
  $('.container').stop().addClass('active');
});

$('.close').on('click', function() {
  $('.container').stop().removeClass('active');
});
