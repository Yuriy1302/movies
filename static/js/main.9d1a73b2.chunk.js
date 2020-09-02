(this["webpackJsonpmovies-pr"]=this["webpackJsonpmovies-pr"]||[]).push([[0],{130:function(e,t,a){e.exports=a(215)},135:function(e,t,a){},191:function(e,t,a){},206:function(e,t,a){},211:function(e,t,a){},213:function(e,t,a){},214:function(e,t,a){},215:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),s=a(14),o=a.n(s),i=a(45),c=a(46),u=a(59),l=a(58),h=a(62),v=a(223),d=a(225),p=a(94),g=a(114),m=a(228),f=a(127),E=a(220),b=a(227),y=a(224),w=a(219),S=a(222),P=n.a.createContext(),R=P.Provider,M=P.Consumer,k=(a(135),a(136),function(e){Object(u.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(i.a)(this,a);for(var r=arguments.length,s=new Array(r),o=0;o<r;o++)s[o]=arguments[o];return(e=t.call.apply(t,[this].concat(s))).croppingText=function(e){return e.length<100?e:"".concat(e.slice(0,e.indexOf(" ",100))," ...")},e.croppingTitle=function(e){return e.length<30?e:"".concat(e.slice(0,e.indexOf(" ",30))," ...")},e.renderGenres=function(t){var a=e.props.genreIds.map((function(e){var a=t.filter((function(t){var a=t.id;return e===a}));return Object(f.a)(a,1)[0]})).slice(0,3);return n.a.createElement(n.a.Fragment,null,a.map((function(e){return n.a.createElement(b.a,{key:e.id},e.name)})))},e.ratingColor=function(e){return e>7?"#66e900":e>5?"#e9d100":e>3?"#e97e00":"#e90000"},e}return Object(c.a)(a,[{key:"render",value:function(){var e=this,t=d.a.Content,a=this.props,r=a.id,s=a.title,o=a.posterPath,i=a.overview,c=a.releaseDate,u=a.voteAverage,l=a.rating,h=a.handleRateMovie,v=c?Object(E.a)(new Date(c),"MMMM dd, yyyy"):"-",p={borderColor:this.ratingColor(u)};return n.a.createElement(m.b.Item,{key:r},n.a.createElement(y.a,{className:"card-movie",hoverable:!0,cover:o?n.a.createElement("img",{src:"http://image.tmdb.org/t/p/w185".concat(o),alt:"Poster"}):n.a.createElement("div",{className:"no-poster"},n.a.createElement("i",null,"No poster"))},n.a.createElement(w.a,{direction:"vertical"},n.a.createElement("h5",{className:"card-movie__title"},this.croppingTitle(s)),n.a.createElement("span",{className:"card-movie__date"},v),n.a.createElement(t,null,n.a.createElement(M,null,(function(t){return e.renderGenres(t)}))),n.a.createElement("p",{className:"card-movie__overview"},this.croppingText(i)),n.a.createElement(S.a,{onChange:function(e){return h(r,e)},defaultValue:l,count:10,allowHalf:!0,style:{fontSize:15},className:"rate-stars"}),n.a.createElement("div",{className:"rating",style:p},u))))}}]),a}(n.a.Component));k.defaultProps={title:"",posterPath:"",overview:"",releaseDate:"",rating:""};var C=k,j=a(221),x=a(119),O=a(226),T=(a(191),function(){return n.a.createElement(O.a,{type:"error",message:"Oops!",description:"Something went wrong!",style:{width:300},showIcon:!0})}),N=(a(206),function(e){Object(u.a)(a,e);var t=Object(l.a)(a);function a(e){var r;Object(i.a)(this,a);var n=(r=t.call(this,e)).props.onDebounced;return r.debouncedUpdate=Object(x.debounce)((function(e){return n(e)}),700),r.state={hasError:!1},r}return Object(c.a)(a,[{key:"componentDidCatch",value:function(){this.setState({hasError:!0})}},{key:"render",value:function(){var e=this;return this.state.hasError?n.a.createElement("div",{className:"alert_example"},n.a.createElement(T,null)):n.a.createElement(j.a,{placeholder:"Type to search...",size:"large",style:{width:"100%",margin:"20px 0"},onChange:function(t){var a=t.target.value;return e.debouncedUpdate(a)}})}}]),a}(n.a.Component)),D=a(125),_=(a(105),a(211),function(e){var t=e.defaultPage,a=e.page,r=e.totalResults,s=e.onPageChange;return n.a.createElement(D.a,{style:{margin:"10px auto"},size:"small",showSizeChanger:!1,defaultPageSize:20,defaultCurrent:t,current:a,total:r,onChange:s})}),I=a(35),L=a.n(I),A=a(53),G=function(){function e(){Object(i.a)(this,e),this.apiKey="?api_key=05f7db0eb20b02a8803d7f7d0f3fb520",this.baseApi="https://api.themoviedb.org/3",this.transformSearchMovies=function(e){return{id:e.id,popularity:e.popularity,voteAverage:e.vote_average,title:e.title,originalTitle:e.original_title,overview:e.overview,posterPath:e.poster_path,releaseDate:e.release_date,genreIds:e.genre_ids,rating:e.rating}}}return Object(c.a)(e,[{key:"getResource",value:function(){var e=Object(A.a)(L.a.mark((function e(t){var a;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(t);case 3:if((a=e.sent).ok){e.next=6;break}throw new Error("Could not fetch ".concat(t," received ").concat(a.status));case 6:return e.next=8,a.json();case 8:return e.abrupt("return",e.sent);case 11:throw e.prev=11,e.t0=e.catch(0),new Error("There is an error in getting resources -> ",e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(t){return e.apply(this,arguments)}}()},{key:"getSearchMovies",value:function(){var e=Object(A.a)(L.a.mark((function e(t,a){var r,n,s;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.getResource("".concat(this.baseApi,"/search/movie").concat(this.apiKey,"&language=en-US&query=").concat(t,"&page=").concat(a,"&include_adult=false"));case 3:return r=e.sent,n=r.total_results,s=r.results.map(this.transformSearchMovies),e.abrupt("return",{totalResults:n,results:s});case 9:throw e.prev=9,e.t0=e.catch(0),new Error("There is an error in search movies -> ",e.t0);case 12:case"end":return e.stop()}}),e,this,[[0,9]])})));return function(t,a){return e.apply(this,arguments)}}()},{key:"getGenreNames",value:function(){var e=Object(A.a)(L.a.mark((function e(){var t,a;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("".concat(this.baseApi,"/genre/movie/list").concat(this.apiKey,"&language=en-US"));case 3:if((t=e.sent).ok){e.next=6;break}throw new Error("Could not fetch 'genre' received ".concat(t.status));case 6:return e.next=8,t.json();case 8:return a=e.sent,e.abrupt("return",a.genres);case 12:throw e.prev=12,e.t0=e.catch(0),new Error("There is an error in getting genres -> ",e.t0);case 15:case"end":return e.stop()}}),e,this,[[0,12]])})));return function(){return e.apply(this,arguments)}}()},{key:"getRatedMovies",value:function(){var e=Object(A.a)(L.a.mark((function e(t,a){var r,n,s;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.getResource("".concat(this.baseApi,"/guest_session/").concat(t,"/rated/movies").concat(this.apiKey,"&language=en-US&page=").concat(a,"&sort_by=created_at.desc"));case 3:return r=e.sent,n=r.total_results,s=r.results.map(this.transformSearchMovies),e.abrupt("return",{totalResults:n,results:s});case 9:throw e.prev=9,e.t0=e.catch(0),new Error("There is an error in get rated movies -> ",e.t0);case 12:case"end":return e.stop()}}),e,this,[[0,9]])})));return function(t,a){return e.apply(this,arguments)}}()},{key:"postRateMovie",value:function(){var e=Object(A.a)(L.a.mark((function e(t,a,r){var n,s;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("".concat(this.baseApi,"/movie/").concat(t,"/rating").concat(this.apiKey,"&guest_session_id=").concat(r),{method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify({value:a})});case 3:if((n=e.sent).ok){e.next=6;break}throw new Error("Could not fetch RATE received ".concat(n.status));case 6:return e.next=8,n.json();case 8:return s=e.sent,e.abrupt("return",s);case 12:throw e.prev=12,e.t0=e.catch(0),new Error("There is an error in post rate movie -> ",e.t0);case 15:case"end":return e.stop()}}),e,this,[[0,12]])})));return function(t,a,r){return e.apply(this,arguments)}}()},{key:"createGuestSession",value:function(){var e=Object(A.a)(L.a.mark((function e(){var t,a;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("".concat(this.baseApi,"/authentication/guest_session/new").concat(this.apiKey));case 3:if((t=e.sent).ok){e.next=6;break}throw new Error("Could not fetch 'Create Guest Session' received ".concat(t.status));case 6:return e.next=8,t.json();case 8:return a=e.sent,e.abrupt("return",a.guest_session_id);case 12:throw e.prev=12,e.t0=e.catch(0),new Error("There is an error in creating new guest session -> ",e.t0);case 15:case"end":return e.stop()}}),e,this,[[0,12]])})));return function(){return e.apply(this,arguments)}}()}]),e}(),z=(a(213),function(e){Object(u.a)(a,e);var t=Object(l.a)(a);function a(e){var r;Object(i.a)(this,a),(r=t.call(this,e)).movieService=new G,r.componentDidUpdate=function(e,t){var a=r.state,n=a.moviePage,s=a.searchMovie,o=a.ratePage,i=a.guestSessionID;s!==t.searchMovie&&r.setState({moviePage:1}),n!==t.moviePage&&(r.updateSearchMovies(s,n),window.scroll(0,0)),o!==t.ratePage&&(r.updateRatedMovies(i,o),window.scroll(0,0))},r.onError=function(){r.setState({error:!0,loading:!1})},r.addGenreNames=function(){r.movieService.getGenreNames().then((function(e){return r.setState({genreNames:e})})).catch(r.onError)},r.onSearchMoviesListLoaded=function(e){r.setState({moviesList:e.results,movieTotalResults:e.totalResults,loading:!1})},r.updateSearchMovies=function(e,t){r.movieService.getSearchMovies(e,t).then(r.onSearchMoviesListLoaded).catch(r.onError)},r.onDebounced=function(e){if(!(e.length<1)){var t=r.props.moviePage;r.setState({searchMovie:e}),r.updateSearchMovies(e,t)}},r.onMoviePageChange=function(e){r.setState({moviePage:e})},r.onRatePageChange=function(e){r.setState({ratePage:e})},r.renderEmpty=function(){return n.a.createElement(h.a,{image:"https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg",imageStyle:{height:60}},n.a.createElement("h6",null,"The search did not return any results."),n.a.createElement("span",null,"Try changing your request."))},r.renderEmptyRate=function(){return n.a.createElement(h.a,{image:"https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg",imageStyle:{height:60}},n.a.createElement("h6",null,"You haven't rated movies yet."),n.a.createElement("span",null,"Rate the movie and it will appear on this list."))},r.onRateListLoaded=function(e){r.setState({rateList:e.results,rateTotalResults:e.totalResults})},r.updateRatedMovies=function(e,t){r.movieService.getRatedMovies(e,t).then((function(e){r.onRateListLoaded(e)})).catch(r.onError)},r.handleRateMovie=function(e,t){var a=r.state.guestSessionID;r.movieService.postRateMovie(e,t,a).then(v.a.success({message:"Rating received",description:"Movie added to the Rate tab",duration:2})).catch(r.onError)},r.onChangeTabs=function(e){var t=r.state,a=t.guestSessionID,n=t.ratePage,s=void 0===n?"":n;"2"===e&&a&&r.updateRatedMovies(a,s)},r.updateGuestSession=function(e){r.setState({guestSessionID:e}),localStorage.setItem("guestSessionID",e)},r.createGuestSession=function(){r.movieService.createGuestSession().then(r.updateGuestSession).catch(r.onError)};var s=r.props,o=s.defaultSearchMovie,c=s.defaultPage,u=s.ratePage;return r.state={searchMovie:o,moviePage:c,ratePage:u,moviesList:[],movieTotalResults:null,rateTotalResults:null,genreNames:[],error:!1,loading:!0,guestSessionID:null,rateList:[]},r}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=localStorage.getItem("guestSessionID");e?this.setState({guestSessionID:e}):this.createGuestSession(),this.addGenreNames();var t=this.props,a=t.defaultSearchMovie,r=t.defaultPage,n=this.state.ratePage;this.updateSearchMovies(a,r),e&&this.updateRatedMovies(e,n)}},{key:"componentDidCatch",value:function(){this.setState({error:!0,loading:!1})}},{key:"render",value:function(){var e=this,t=d.a.Content,a=p.a.TabPane,r=this.state,s=r.error,o=r.loading,i=r.genreNames,c=r.moviePage,u=r.moviesList,l=r.movieTotalResults,h=r.ratePage,v=r.rateList,f=r.rateTotalResults,E=this.props.defaultPage;return s?n.a.createElement(T,null):o?n.a.createElement("div",{className:"example"},n.a.createElement(g.a,{size:"large"})):n.a.createElement(d.a,{className:"container"},n.a.createElement(R,{value:i},n.a.createElement(p.a,{defaultActiveKey:"1",size:"large",centered:!0,onChange:this.onChangeTabs},n.a.createElement(a,{tab:"Search",key:"1"},n.a.createElement(t,null,n.a.createElement(N,{onDebounced:this.onDebounced})),n.a.createElement(t,null,u.length?n.a.createElement(m.b,{className:"list-align",justify:"space-around",grid:{gutter:36,md:2},dataSource:u,renderItem:function(t){return n.a.createElement(C,{id:t.id,title:t.title,posterPath:t.posterPath,overview:t.overview,releaseDate:t.releaseDate,genreIds:t.genreIds,voteAverage:t.voteAverage,handleRateMovie:e.handleRateMovie})}}):this.renderEmpty()),n.a.createElement(t,{className:"centered"},l>20?n.a.createElement(_,{defaultPage:E,page:c,totalResults:l,onPageChange:this.onMoviePageChange}):null)),n.a.createElement(a,{tab:"Rate",key:"2"},n.a.createElement(t,null,v.length?n.a.createElement(m.b,{className:"list-align",justify:"space-around",grid:{gutter:36,md:2},dataSource:v,renderItem:function(t){return n.a.createElement(C,{id:t.id,title:t.title,posterPath:t.posterPath,overview:t.overview,releaseDate:t.releaseDate,genreIds:t.genreIds,voteAverage:t.voteAverage,rating:t.rating,handleRateMovie:e.handleRateMovie})}}):this.renderEmptyRate()),n.a.createElement(t,{className:"centered"},f>20?n.a.createElement(_,{defaultPage:E,page:h,totalResults:f,onPageChange:this.onRatePageChange}):null)))))}}]),a}(r.Component));z.defaultProps={defaultPage:1,defaultSearchMovie:"return",moviePage:z.defaultPage,ratePage:1};var K=z;a(214);o.a.render(n.a.createElement(K,null),document.getElementById("root"))}},[[130,1,2]]]);
//# sourceMappingURL=main.9d1a73b2.chunk.js.map