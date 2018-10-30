const[AppPage]=function(){"use strict";const e=function(){this.monitor=new Monitor("AppPage"),this.monitor.KEY_ENTER("AppPage"),this.dataInterface=new DataInterface,this.renderTopAdvertisers=function(e,t,s){let a;return function(){const n=this,r=arguments,o=s&&!a;clearTimeout(a),a=setTimeout(function(){a=null,s||e.apply(n,r)},t),o&&e.apply(n,r)}}(this.renderTopAdvertisersImmediately,200).bind(this),this.sortByKey="HighImpressions",this.monitor.KEY_EXIT("AppPage")};e.prototype._renderTargets=function(e,t=!1){const s=e=>1===e.typeCount?"(1 time)":` (${e.typeCount} times)`,a=e=>{return` (${Math.round(1e3*e.typeCount/e.adCount)/10}% of ads)`};e.selectAll("*").remove(),e.append("div").attr("class","targetTypeHeader").call(e=>{e.append("span").attr("class","label").text(e=>e.label)}),e.append("div").attr("class","targetTypeBody").call(e=>{e.append("span").attr("class","bar").style("width",e=>`${560*e.typeCount/e.adCount}px`),e.append("span").attr("class","count").text(t?a:s)});const n=e.filter(e=>e.hasValues).append("div").attr("class","targetValuesContainer").classed("isCollapsed",!0);n.append("div").attr("class","targetValuesHead").call(e=>{const t=e.append("span").attr("class","action actionShowTargets openContainer").on("click",()=>{const e=d3.select(d3.event.target.parentNode.parentNode);e.selectAll(".targetValuesBody").transition().duration(160).style("max-height","500px").on("start",()=>{e.classed("isCollapsed",!1).classed("isExpanded",!0)})}),s=e.append("span").attr("class","action actionHideTargets closeContainer").on("click",()=>{const e=d3.select(d3.event.target.parentNode.parentNode);e.selectAll(".targetValuesBody").transition().duration(160).style("max-height","0px").on("end",()=>{e.classed("isCollapsed",!0).classed("isExpanded",!1)})});t.append("span").attr("class","label").text("Show targets"),t.append("img").attr("class","arrow arrowDown").attr("alt","Show targets").attr("src","show_targets_triangle_down.svg"),s.append("span").attr("class","label").text("Hide targets"),s.append("img").attr("class","arrow arrowUp").attr("alt","Hide targets").attr("src","show_targets_triangle_up.svg")}),n.append("div").attr("class","targetValuesBody").call(e=>{const t=e.selectAll("div.targetValue").data(e=>e.targetValues);t.exit().remove(),t.enter().append("div").attr("class","targetValue").merge(t).text(e=>e)}),e.filter(e=>!e.hasValues).append("div").attr("class","targetValuesNoContainer").call(e=>{e.append("span").attr("class","label").text("No targets to show"),e.append("span").text(" - "),e.append("span").attr("class","text").text("Facebook does not provide targeting details for this category")})},e.prototype.renderYourTargets=function(){this.monitor.ENTER("renderYourTargets"),this.dataInterface.computeYourTargetStats().then(e=>{const t=this.dataInterface.getAllTargetTypes().map(t=>Object.assign(e[t.key],t)).sort((e,t)=>t.typeCount-e.typeCount).filter(e=>e.typeCount>0),s=d3.select("#YourTargetsContainer"),a=s.selectAll("div.yourTargetContainer").data(t);a.exit().remove(),a.enter().append("div").attr("class","yourTargetContainer").merge(a).call(this._renderTargets.bind(this));const n=t.reduce((e,t)=>e+t.adCount,0);s.selectAll(".msgNoAdsCollected").style("display",0===n?"block":null),this.monitor.EXIT("renderYourTargets")})},e.prototype.renderPublicTargets=function(){this.monitor.ENTER("renderPublicTargets"),this.dataInterface.computePublicTargetStats().then(e=>{const t=this.dataInterface.getAllTargetTypes().map(t=>Object.assign(e[t.key],t)).sort((e,t)=>t.typeCount-e.typeCount).filter(e=>e.typeCount>0),s=d3.select("#PublicTargetsContainer").selectAll("div.publicTargetContainer").data(t);s.exit().remove(),s.enter().append("div").attr("class","publicTargetContainer").merge(s).call(e=>this._renderTargets(e,!0)),this.monitor.EXIT("renderPublicTargets")})},e.prototype.showYourTargetContainer=function(){this.renderTargetContainerTabs(!0)},e.prototype.showPublicTargetContainer=function(){this.renderTargetContainerTabs(!1)},e.prototype.initTargetContainerTabs=function(){return new Promise(e=>{this.monitor.ENTER("initTargetContainerTabs"),this.dataInterface.isIncognito().then(t=>{t&&d3.selectAll(".actionShowYourTargets").classed("disabled",!0),this.monitor.EXIT("initTargetContainerTabs"),e()})})},e.prototype.renderTargetContainerTabs=function(e){this.monitor.ENTER("renderTargetContainerTabs"),this.dataInterface.isIncognito().then(t=>{(e=>{d3.select("#YourTargetsContainer").style("display",e?"block":"none"),d3.select("#PublicTargetsContainer").style("display",e?"none":"block"),d3.selectAll(".actionShowYourTargets").classed("active",e).classed("inactive",!e),d3.selectAll(".actionShowPublicTargets").classed("active",!e).classed("inactive",e)})(!t&&e),this.monitor.EXIT("renderTargetContainerTabs")})};const t={ALL:"All users",male:"Men",female:"Women"},s={ALL:"All ages","13-17":"13 to 17","18-24":"18 to 24","25-34":"25 to 34","35-44":"35 to 44","45-54":"45 to 54","55-64":"55 to 64","65+":"65 and over"};return e.prototype._updateFilterByControls=function(){const e=d3.selectAll(".radioFilterByState"),t=d3.selectAll(".radioFilterByGenderAndAge"),s=d3.selectAll(".labelTopAdvertisersByState"),a=d3.selectAll(".labelTopAdvertisersByGenderAndAge"),n=d3.selectAll(".selectTopAdvertisersByState"),r=d3.selectAll(".selectTopAdvertisersByGender"),o=d3.selectAll(".selectTopAdvertisersByAge");return e.node().checked?(n.node().disabled=!1,s.classed("disabled",!1),r.node().disabled=!0,o.node().disabled=!0,a.classed("disabled",!0),"State"):t.node().checked?(n.node().disabled=!0,s.classed("disabled",!0),r.node().disabled=!1,o.node().disabled=!1,a.classed("disabled",!1),"GenderAndAge"):(n.node().disabled=!0,s.classed("disabled",!0),r.node().disabled=!0,o.node().disabled=!0,a.classed("disabled",!0),null)},e.prototype.initPageImpressionControls=function(){return new Promise(e=>{this.monitor.ENTER("initPageImpressionControls"),d3.selectAll(".radioFilterByState").on("change",this.renderTopAdvertisers.bind(this)),d3.selectAll(".radioFilterByGenderAndAge").on("change",this.renderTopAdvertisers.bind(this)),this.dataInterface.computeTopAdvertisersIndex().then(a=>{this.monitor.DATA("index =",a);(()=>{const e=e=>{if("ALL"===e)return"since May 2018";{const t=e.split("-"),s=parseInt(t[0]),a=parseInt(t[1]),n=parseInt(t[2]),r=new Date(s,a-1,n);return`for the week ending ${new Date(r.getTime()+5184e5).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}`}},t=a.week_keys,s=d3.selectAll(".selectTopAdvertisersByWeek");s.selectAll("option").data(t).enter().append("option").attr("selected",(e,t)=>0===t?"selected":null).attr("value",e=>e).attr("label",e).text(e),s.on("change",this.renderTopAdvertisers.bind(this))})(),(()=>{const e=e=>"ALL"===e?"All US states and the District of Columbia":e,t=a.state_keys,s=d3.selectAll(".selectTopAdvertisersByState");s.selectAll("option").data(t).enter().append("option").attr("selected",(e,t)=>0===t?"selected":null).attr("value",e=>e).attr("label",e).text(e),s.on("change",this.renderTopAdvertisers.bind(this))})(),(()=>{const e=e=>t[e],s=a.gender_keys,n=d3.selectAll(".selectTopAdvertisersByGender");n.selectAll("option").data(s).enter().append("option").attr("selected",(e,t)=>0===t?"selected":null).attr("value",e=>e).attr("label",e).text(e),n.on("change",this.renderTopAdvertisers.bind(this))})(),(()=>{const e=e=>s[e],t=a.age_keys,n=d3.selectAll(".selectTopAdvertisersByAge");n.selectAll("option").data(t).enter().append("option").attr("selected",(e,t)=>0===t?"selected":null).attr("value",e=>e).attr("label",e).text(e),n.on("change",this.renderTopAdvertisers.bind(this))})(),(()=>{const e=[];a.week_keys.map(e=>a.weeks[e]).forEach(t=>{t.state_keys.map(e=>t.states[e]).forEach(t=>{e.push(t)}),t.gender_keys.map(e=>t.genders[e]).forEach(t=>{t.age_keys.map(e=>t.ages[e]).forEach(t=>{e.push(t)})})});const t=d3.select("#PageImpressionsContainer").selectAll("div.topAdvertisersTable").data(e);t.exit().remove("*"),t.enter().append("div").attr("class",e=>`topAdvertisersTable ${e.class_name}`)})(),this.monitor.EXIT("initPageImpressionControls"),e()})})},e.prototype.renderTopAdvertisersImmediately=function(){this.monitor.ENTER("renderTopAdvertisers");const e=d3.selectAll(".selectTopAdvertisersByWeek"),t=d3.selectAll(".selectTopAdvertisersByState"),s=d3.selectAll(".selectTopAdvertisersByGender"),a=d3.selectAll(".selectTopAdvertisersByAge"),n=e.node().value,r=t.node().value,o=s.node().value,i=a.node().value,l=function(e,t,s,a,n){const r=e=>e.replace(/\W+/g,""),o=r(e);if("State"===t)return`w${o}_s${r(s)}`;if("GenderAndAge"===t)return`w${o}_g${r(a)}_a${r(n)}`;return`w${o}`}(n,this._updateFilterByControls(),r,o,i);this.monitor.DATA("className =",l),this.dataInterface.computeTopAdvertisersTable(l).then(e=>{const t=d3.format(","),s=e=>e.toLowerCase().replace(/[^\w ]+/g,""),a=(e,t)=>s(e.advertiser).localeCompare(s(t.advertiser)),n=(e,t)=>e.lowImpressions!==t.lowImpressions?t.lowImpressions-e.lowImpressions:e.highImpressions!==t.highImpressions?t.highImpressions-e.highImpressions:s(e.advertiser).localeCompare(s(t.advertiser)),r=(e,t)=>e.highImpressions!==t.highImpressions?t.highImpressions-e.highImpressions:e.lowImpressions!==t.lowImpressions?t.lowImpressions-e.lowImpressions:s(e.advertiser).localeCompare(s(t.advertiser)),o=(e,t)=>e.lowSpending!==t.lowSpending?t.lowSpending-e.lowSpending:e.highSpending!==t.highSpending?t.highSpending-e.highSpending:s(e.advertiser).localeCompare(s(t.advertiser)),i=(e,t)=>e.highSpending!==t.highSpending?t.highSpending-e.highSpending:e.lowSpending!==t.lowSpending?t.lowSpending-e.lowSpending:s(e.advertiser).localeCompare(s(t.advertiser)),d=()=>{const t=e=>e.slice(0,Math.min(e.length,250)),s=e.map(e=>({advertiser:e[0],lowImpressions:parseInt(e[1]),highImpressions:parseInt(e[2]),lowSpending:parseInt(e[3]),highSpending:parseInt(e[4])}));return"Label"===this.sortByKey?t(s.sort(a)):"LowImpressions"===this.sortByKey?t(s.sort(n)):"HighImpressions"===this.sortByKey?t(s.sort(r)):"LowSpending"===this.sortByKey?t(s.sort(o)):"HighSpending"===this.sortByKey?t(s.sort(i)):t(s)},p=e=>{const t=()=>{d3.select(d3.event.target).classed("hover",!0)},s=()=>{d3.select(d3.event.target).classed("hover",!1)},a=e=>()=>{this.sortByKey=e,g(e),this.renderTopAdvertisers()},n=e.append("span").attr("class","field label").append("div").attr("class","doubleLabel action actionSortBy actionSortByLabel").on("mouseover",t).on("mouseout",s).on("click",a("Label"));n.append("span").text("Advertiser"),n.append("img").attr("class","sort sortAZ").attr("alt","Sort by advertiser").attr("src","sort_az.svg");const r=e.append("span").attr("class","field impressions");r.append("div").attr("class","topLabel").append("span").text("Impressions");const o=r.append("div").attr("class","bottomLabel"),i=o.append("span").attr("class","lowImpressions action actionSortBy actionSortByLowImpressions").on("mouseover",t).on("mouseout",s).on("click",a("LowImpressions"));o.append("span").attr("class","dash");const l=o.append("span").attr("class","highImpressions action actionSortBy actionSortByHighImpressions").on("mouseover",t).on("mouseout",s).on("click",a("HighImpressions"));i.append("span").text("Low"),i.append("img").attr("class","sort sortNumber").attr("alt","Sort by low impressions").attr("src","sort_number.svg"),l.append("span").text("High"),l.append("img").attr("class","sort sortNumber").attr("alt","Sort by high impressions").attr("src","sort_number.svg");const d=e.append("span").attr("class","field spending");d.append("div").attr("class","topLabel").append("span").text("Spending");const p=d.append("div").attr("class","bottomLabel"),c=p.append("span").attr("class","lowSpending action actionSortBy actionSortByLowSpending").on("mouseover",t).on("mouseout",s).on("click",a("LowSpending"));p.append("span").attr("class","dash");const h=p.append("span").attr("class","highSpending action actionSortBy actionSortByHighSpending").on("mouseover",t).on("mouseout",s).on("click",a("HighSpending"));c.append("span").text("Low"),c.append("img").attr("class","sort sortNumber action actionSortBy actionSortByLowSpending").attr("alt","Sort by low spending").attr("src","sort_number.svg"),h.append("span").text("High"),h.append("img").attr("class","sort sortNumber action actionSortBy actionSortByHighSpending").attr("alt","Sort by high spending").attr("src","sort_number.svg")},c=e=>{const s=e.selectAll("div.row").data(d).enter().append("div").attr("class","row");s.append("span").attr("class","field label").append("a").attr("href",e=>(e=>{return`https://www.facebook.com/ads/archive/?country=US&q=${encodeURIComponent(e)}`})(e.advertiser)).attr("rel","noopener noreferrer").attr("target","_blank").text(e=>e.advertiser),s.append("span").attr("class","field lowImpressions").text(e=>`${t(e.lowImpressions)}`),s.append("span").attr("class","field dash").text("-"),s.append("span").attr("class","field highImpressions").text(e=>`${t(e.highImpressions)}`),s.append("span").attr("class","field lowSpending").text(e=>0===e.lowSpending&&0===e.highSpending?"":`$${t(e.lowSpending)}`),s.append("span").attr("class","field dash").text(e=>0===e.highSpending?"":"-"),s.append("span").attr("class","field highSpending").text(e=>0===e.highSpending?"":`$${t(e.highSpending)}`)},g=e=>{d3.selectAll(".actionSortBy").classed("sortActive",!1).classed("sortInactive",!0),d3.selectAll(`.actionSortBy${e}`).classed("sortActive",!0).classed("sortInactive",!1)};d3.selectAll(".topAdvertisersTable").style("display","none").selectAll("*").remove(),d3.selectAll(`.${l}`).call(e=>{e.append("div").attr("class","header").call(p),e.append("div").attr("class","body").call(c)}).style("display","block"),g(this.sortByKey),this.monitor.EXIT("renderTopAdvertisers")})},e.prototype.initClickActions=function(){this.monitor.ENTER("initClickActions"),d3.selectAll(".actionShowYourTargets").on("click",this.showYourTargetContainer.bind(this)),d3.selectAll(".actionShowPublicTargets").on("click",this.showPublicTargetContainer.bind(this)),this.monitor.EXIT("initClickActions")},e.prototype.initDataEvents=function(){this.monitor.ENTER("initDataEvents"),this.initClickActions(),this.initTargetContainerTabs().then(()=>{this.renderTargetContainerTabs(!0),this.renderPublicTargets(),this.renderYourTargets(),this.initPageImpressionControls().then(()=>{this.renderTopAdvertisers(),this.dataInterface.onDatabaseEvents(this.renderYourTargets.bind(this)),this.monitor.EXIT("initDataEvents")})})},[e]}(),appPage=new AppPage;document.addEventListener("DOMContentLoaded",function(){appPage.initDataEvents()});