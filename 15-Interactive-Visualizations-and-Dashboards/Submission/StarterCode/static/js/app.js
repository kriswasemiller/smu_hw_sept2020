$(document).ready(function() {
    doWork();
});

function doWork() {
    d3.json("samples.json").then((data) => {
        console.log(data);

        //render dropdown
        data.names.forEach(function(val) {
            var newOption = `<option>${val}</option>`;
            $(`#selDataset`).append(newOption);
        });

        //get first name in dropdown
        var sample = parseInt($("#selDataset").val());
        console.log(sample);

        //filter metadata
        var metadata = data.metadata.filter(x => x.id === sample)[0];
        console.log(metadata);

        //build div
        Object.entries(metadata).forEach(function(key_value, index) {
            var entry = `<span><b>${key_value[0]}:</b> ${key_value[1]}</span><br>`;
            $("#sample-metadata").append(entry);

            //filter sample data
            var sample_data = data.samples.filter(x => x.id == sample)[0];
            console.log(sample_data);

            //bar charts
            var y_labels = sample_data.otu_ids.slice(0, 10).reverse().map(x => `OTU ID: ${x}`);
            var trace = {
                x: sample_data.sample_values.slice(0, 10).reverse(),
                y: y_labels,
                text: sample_data.otu_labels.slice(0, 10).reverse(),
                type: 'bar',
                orientation: "h"
            };

            var layout = {
                title: "Top Bacteria Present in Subjects Belly Button",
                xaxis: { title: "Amount of Bacteria" },
                yaxis: { title: "Bacteria ID" }
            }
            var traces = [trace];

            Plotly.newPlot('bar', traces, layout);
        })

        function makeBubble(sample_data) {
            // make bubble plot
            var trace = {
                x: sample_data.otu_ids,
                y: sample_data.sample_values,
                mode: 'markers',
                marker: {
                    size: sample_data.sample_values,
                    color: sample_data.otu_ids
                },
                text: sample_data.otu_labels
            };

            var traces = [trace];

            var layout = {
                title: "Amount of Bacteria Present in Subject Belly Button",
                xaxis: { title: "Bacteria ID" },
                yaxis: { title: "Amount of Bacteria" }
            }

            Plotly.newPlot('bubble', traces, layout);
        }
    });
}