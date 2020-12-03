
var nodes = new vis.DataSet([
    { id: 1, label: "Q1",color:{border:'#17a2b8', background: '#ffffff'},fixed:{x:true,y:true}},
    { id: 2, label: "Q2",color:{border:'#17a2b8', background: '#ffffff'},fixed:{x:true,y:true}},
    { id: 3, label: "Q3", borderWidth:3,color:{border:'#a0c06b',background: '#ffffff'},fixed:{x:true,y:true}},
]);


var edges = new vis.DataSet([
    { id:0,from: 1, to: 1,color:{color:'#a0c06b'},selfReferenceSize:1,arrows:{to:{enabled:true,scaleFactor: 1.5}}},
    { id:1,from: 1, to: 1,font: {color: '#ffffff',strokeWidth: 1,strokeColor: '#171a6b'},color:{color:'#00e3ec'},label:'" ", a, R',arrows:{to:{enabled:true}}},
    { id:2,from: 1, to: 1,font: {color: '#ffffff',strokeWidth: 1,strokeColor: '#171a6b'},color:{color:'#00e3ec'}, arrows:{to:{enabled:true}},selfReferenceSize:50, label:'b, a, R'},
    { id:3,from: 1, to: 1,font: {color: '#ffffff',strokeWidth: 1,strokeColor: '#171a6b'},color:{color:'#00e3ec'}, arrows:{to:{enabled:true}},selfReferenceSize:75, label:'a, a, R'},
    { id:4,from: 1, to: 2,font: {color: '#ffffff',strokeWidth: 1,strokeColor: '#171a6b'},color:{color:'#00e3ec'}, length:200, label:'Ɛ, Ɛ, L',arrows:{to:{enabled:true}}},
    { id:5,from: 2, to: 2,font: {color: '#ffffff',strokeWidth: 1,strokeColor: '#171a6b'},color:{color:'#00e3ec'}, label:'a,a,L',selfReferenceSize:40,arrows:{to:{enabled:true}}},
    { id:6,from: 2, to: 3,font: {color: '#ffffff',strokeWidth: 1,strokeColor: '#171a6b'},color:{color:'#00e3ec'}, length:200, label:'Ɛ, Ɛ, R',arrows:{to:{enabled:true}} }
]);

var container = document.getElementById("mynetwork");
var data = {
    nodes: nodes,
    edges: edges
};
var options = {
    nodes:{
    shape: 'circle',
    },
    edges:{
        smooth: {
            type: 'cubicBezier',
            forceDirection: 'vertical',
            roundness: 0.9,
            enabled: true
          },
    },
    physics: {
        enabled: true,
        barnesHut: {
            centralGravity: 0.0,
            springLength: 0,
            springConstant: 0.04,
            damping: 1
        },
            solver: 'barnesHut'
    },
    interaction: {
        dragNodes: false,
        dragView: false,
        zoomView: false,
        hover: false,
        selectable: false
        }
}

var network = new vis.Network(container, data,options);
    network.moveTo({
    position: {x:0,y:0},
    scale: 1.0,
    offset: {x:0,y:0}
  })
  
  network.on('afterDrawing', function(){
    var dataN = [{id: 1, x: 0, y:-230}, {id:2, x:0, y:40}, {id:3, x:0, y:290}];
    nodes.update(dataN);
  })

function updateNetwork(index){
    resetNodes();
    nodes.update({id:3,color:{border:'#a0c06b',background: '#ffffff'}})
    if(index <=3 && index >0){
        nodes.update ({id: 1, color: {background: '#a0c06b'}});
            
    }
    if(index == 4 || index ==5){
        nodes.update ({id: 2, color: {background: '#a0c06b'}});
    }
    if(index == 6)
        nodes.update ({id: 3, color: {background: '#a0c06b'}});
            
    edges.update({id: index, color: {color:'#a0c06b'},shadow: {
        enabled: true,
        color: "rgba(0,0,0,0.5)"
    }})
    
}
function resetNodes(){
    for(var i=1;i<3;i++){
        nodes.update({id:i,color:{background: '#ffffff'}})
    }
}
function resetEdges(){
    for(var i=1;i<7;i++){
        edges.update({id:i,color:{color: '#00e3ec'},shadow:{enabled:false}})
    }
}