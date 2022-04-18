const defaultThreads = [
    {
        id: 1, //allows each thread object to navigate to thread.html
        title: "Thread 1",
        author: "Andrew",
        date: Date.now(),
        content: "Thread content",
        comments: [
            {
                author: "Becky",
                date: Date.now(),
                content: "Hey there"
            },
            {
                author: "Joe",
                date: Date.now(),
                content: "Hey to you too"
            }
        ]
    },
    {
        id: 2,
        title: "Thread 2",
        author: "Jonathan",
        date: Date.now(),
        content: "Thread content 2",
        comments: [
            {
                author: "Joe",
                date: Date.now(),
                content: "Did you see that duck?"
            },
            {
                author: "Becky",
                date: Date.now(),
                content: "What duck?"
            }
        ]
    }
]

// Set up global 'threads' variable:
let threads;
// Are the threads in local storage?
if (window.localStorage.getItem('threads') !== null) {
    // If they are, get them:
    threads = JSON.parse(window.localStorage.getItem('threads')); 
} else {
    // If they aren't, set them to the default shown in 'defaultThreads':
    threads = defaultThreads;
    window.localStorage.setItem('threads', JSON.stringify(defaultThreads)); 
}