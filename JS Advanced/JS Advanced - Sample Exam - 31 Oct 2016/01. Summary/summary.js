

function summarize(selector) {

    let button = $(selector);

    button.click(function () {
        let summaries = $("#content strong");
        let sumamryText = Array.from(summaries.map((ind, elem) => elem.textContent)).join("");

        let summary = $("<div>").attr("id", "summary");
        let summaryHeading = $("<h2>").text("summary");
        let summaryContent = $("<p>").text(sumamryText);
        summary.append(summaryHeading);
        summary.append(summaryContent);

        let wrapper = $("#content").parent();
        wrapper.append(summary);
    });
}