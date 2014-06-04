/** @jsx React.DOM */


var PhotoView = React.createClass({
  imgError:function(e){
    e.target.style.display = 'none';
  },
  componentDidMount: function() {
    animateCheck(this.getDOMNode());
  },
  render: function(){
    return (
      <img src={this.props.mediumUrl} className="photoImg" onError={this.imgError}/>
    );
  }
});

var isScrolledIntoView = function(el){
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();
  var elemTop = $(el).offset().top;
  var elemBottom = elemTop + $(el).height();

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
};
var animateCheck = function(el){
  if(isScrolledIntoView(el)){
    TweenMax.from(el, 1.2, {rotationY:500, scale:0.1, ease:Power1.easeOut});
  }
};
