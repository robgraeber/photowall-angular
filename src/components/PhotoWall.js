/** @jsx React.DOM */
var PhotoWall = React.createClass({
    getInitialState:function(){
      return {
        photoUrls:this.props.photoData.slice(0,60),
      };
    },
    componentDidMount:function(){
      $(window).scroll(function(){
        var topHeight = $("body").height() - window.innerHeight;
        if(topHeight - $(window).scrollTop() < 1000){
          var photoUrls = this.state.photoUrls;
          var len = photoUrls.length;
          this.setState({photoUrls: photoUrls.concat(this.props.photoData.slice(len, len+15))});
        }
      }.bind(this));
    },
    render: function(){   
      var photoItems = {};
      _.each(this.state.photoUrls, function(item, index){
        photoItems["photo-"+index] = <PhotoView mediumUrl={item.medium_url} />;
      });   
      return (
        <div className="photos">
          {photoItems}
        </div>
      );
    }
  });