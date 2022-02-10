// Dropdown Menu Function 
// console.log('Hello');
d3.json('samples.json').then(function(data){
    init(data);
});

// Define function
function init(data){
    // console.log(data.names);
    // console.log(data.metadata);
    // console.log(data.samples);
    load_dropdown_list(data.names);
    build_chart('940');
};


// Dropdown Menu Setup
function load_dropdown_list(names){
    let dropdown = document.getElementById('selDataset');
    names.forEach(function(name){
        let opt = document.createElement('option');
        let att = document.createAttribute('value');
        att.value = name;
        opt.setAttributeNode(att);
        opt.text = name;
        dropdown.appendChild(opt);
    })
};

// Function: changing dropdown option
function optionChange(id){
    build_chart(id);
};

// Test Build for CYA
function build_chart(id){
    //console.log('build_chartfor' + id);
    d3.json('samples.json').then(function(data){
        let metadata = data.metadata;
        let samples = data.samples;

        // Filter name and array by ID
        metadata = metadata.filter(participant => participant.id == id)[0];
        samples = samples.filter(participant => participant.id == id)[0];

        // Create: variables for Array
        otu_ids = samples.otu_ids;
        otu_labels = samples.otu_labels;
        let wfreq = metadata.wfreq;
        sample_values = samples.sample_values;

        // Verifying variables and filter
        // console.log(samples);
        // console.log(metadata);
        // console.log(otu_ids);
        // console.log(otu_labels);
        // console.log(wfreq);
        // console.log(samples);

        // Build panel for id sample-metadata
        let panel = d3.select('#sample-metadata');
        panel.html('');
        // Loop for ID and info in sample-metadata
        Object.entries(metadata).forEach(([key, value]) => {
            panel.append('h6').text(`${key.toUpperCase()} : ${value}`);
        });

        // Create: Top 10 Array
        let top_otu_ids = otu_ids.slice(0, 10).reverse();
        let top_otu_labels = otu_labels.slice(0, 10).reverse();
        let top_sample_values = sample_values.slice(0, 10).reverse();

        // Add: Map function
        let top_otu_id_labels = top_otu_ids.map(otu_ids => 'OTU' + otu_ids)
        //console.log(top_otu_id_labels)

        // Verifying Top 10
        // console.log(top_otu_ids);
        // console.log(top_otu_labels);
        // console.log(top_sample_values);

        // Create: bar chart tracer
        var traceBar = {
            x: top_sample_values,
            y: top_otu_id_labels,
            type: 'bar',
            orientation: 'h',
            marker: {
                color: 'orange'
            }
        }

        // Bar Chart layout
        let layout = {
            title: {
                text: `Top 10 OTU for ID ${(id)}`,
                font: {
                    size: 12,
                },
                height: 500,
                width: 500
            }
        };

        // Define: Bar Chart (traceBar)
        var traceBar = [traceBar];

        // Plot: traceBar
        Plotly.newPlot('bar', traceBar, layout);

        // Create: Bubble Chart
        var traceBubble = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'blue'
            }
        }

        // Define: traceBubble
        var traceBubble = [traceBubble];

        // Bubble Chart Layout
        let layout_bubble = {
            title: `Bacteria Samples per Culture ${(id)}`,
            font: {
                size: 12,
            },
            xaxis: {
                title: 'OTU ${(id)}',
                color: 'black'
            },
        }

        // Plot: Bubble Chart (traceBubble)
        Plotly.newPlot('bubble', traceBubble, layout_bubble);

        // Create: gauge trace
        if (wfreq == null){
            wfreq = 0;
        }

        var traceGauge = {
            domain: {x: [0,1], y: [0,1]},
            value: wfreq,
            type: 'indicator',
            mode: 'gauge+number',
            gauge: {
                axis: {
                    domain: {x: [0,1], y: [0,1]},
                    value: wfreq,
                    type: 'indicator',
                    mode: 'gauge+number',
                    gauge: {
                        axis: {
                            range: [0, 9],
                            tickmode: 'linear',
                            tickfont: {
                                size: 12
                            }
                        },

                        bar: { color: 'white'},
                        steps: [
                            { range: [0, 1], color: '#02db8a'},
                            { range: [1, 2], color: '#23a628'},
                            { range: [2, 3], color: '#cbf567'},
                            { range: [3, 4], color: '#e8de05'},
                            { range: [4, 5], color: '#edbd02'},
                            { range: [5, 6], color: '#fcb319'},
                            { range: [6, 7], color: '#ff8e05'},
                            { range: [7, 8], color: '#fc5400'},
                            { range: [8, 9], color: '#f71605'},
                        ]
                    }
                }
            }
        }

                    let layoutGauge = {
                    title: {
                        text: `<b>Test Subject ${id}</b><br><b> Belly Button Washing Frequency </b><br><br> Scrubs per Week`,
                        font: {
                            size: 12,
                        } 
                    }
                };
                
            
        

        var traceGauge = [traceGauge];
        Plotly.newPlot('gauge', traceGauge, layoutGauge);
    });
};