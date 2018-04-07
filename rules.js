module.exports = [
    {
        pattern: "(?x) hello (?y)",
        responses: [
            "How do you do.  Please state your problem."
        ]
    },
    {
        pattern: "(?x) I (?y) you (?z)",
        responses: [
            "Perhaps in your fantasy we ?y each other"
        ]
    },
    {
        pattern: "(?x) I want (?y)",
        responses: [
            "What would it mean if you got ?y",
            "Why do you want ?y"
        ]
    }
];