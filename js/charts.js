function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("js/samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample); 
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("js/samples.json").then((data) => {
    console.log(data);
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("js/samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
      var samples = data.samples;
      var metadatas = data.metadata;

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var resultArray2 = metadatas.filter(sampleObj => sampleObj.id == sample);
   
    //  5. Create a variable that holds the first sample in the array.
     var result = resultArray[0];
     var result2 = resultArray2[0];
    //  console.log(result2.wfreq)

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
      var otu_ids_a = result.otu_ids;
      var otu_labels_a = result.otu_labels;
      var sample_values_a = result.sample_values;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
 
    var yticks = otu_ids_a.map(sampleObj => "OTU " + sampleObj).slice(0,10).reverse();;
    // console.log(yticks);
 
    // 8. Create the trace for the bar chart. 
    var barData = [{
      y: yticks,
      x: sample_values_a.slice(0, 10).reverse(),
      text: otu_labels_a.slice(0, 10).reverse(),
      type: "bar",
      orientation: 'h' 
    }];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: { text: "<b>Top 10 Bacteria Cultures Found </b>", font: { size: 24, color: "black", family: "Arial"} },
    };

    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);

    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: otu_ids_a,
      y: sample_values_a,
      text: otu_labels_a,
      mode: 'markers',
      marker:{
        color:otu_ids_a,
        size:sample_values_a,
        colorscale: "Jet" 
      }
    }];

    // BUBBLE CHART
    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      // title: 'Bubble Cultures Per Sample',
      // font: { color: "black", family: "Arial" },
      title: { text: "<b>Bubble Cultures Per Sample </b>", font: { size: 24, color: "black", family: "Arial"} },
      hovermode:'closest',
      sizemode: 'area'
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble', bubbleData, bubbleLayout); 

// GAUGE CHART
    var gaugeData = [{
      type: "indicator",
      mode: "gauge+number+delta",
      value:  result2.wfreq,
      title: { text: "<b>Belly Button Washing Frequency </b><br> Scrubs per week", font: { size: 24 } },
      // delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
      gauge: {
        axis: { range: [null, 10], tickwidth: 1, tickcolor: "black" },
        bar: { color: "black" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
          { range: [0, 2], color: "red" },
          { range: [2, 4], color: "orange" },
          { range: [4, 6], color: "yellow" },
          { range: [6, 8], color: "yellowgreen" },
          { range: [8, 10], color: "green" }
        ]
     
    }
    }];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 500,
      height: 400,
      margin: { t: 25, r: 25, l: 25, b: 25 },
      // paper_bgcolor: "lavender",
      font: { color: "black", family: "Arial" }
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
  });
}

