const threadHeaderParent = document.querySelector('#thread-header');
const commentsInsertPoint = document.querySelector('#comments-list');
const threadFooterParent = document.querySelector("#comments-footer")

let threadId = window.location.search.slice(1); // grab the part of the URL after the '?': this is our ID
// Set up the current thread using the 'threads' we got in 'localStorageHelper.js', and the ID from the URL:
let currentThread;
const missingThread = {
    title: "No thread found - check your search",
    date: "",
    comments: []
};
/* addComment({
        author: "-",
        date: "",
        content: "No comments found. Try looking in the URL, after the '?'."
    }); */
if (threadId.length > 0) {
    let searchResult = threads.find(function(threadsItem) {
        return (threadsItem.id === Number(threadId));
    });
    if (typeof searchResult === "undefined") {
        // thread with ID in URL not found, display a message:
        currentThread = missingThread;
    } else {
        // thread with correct ID found, use that:
        currentThread = searchResult;
    }
} else {
    // Should really display a message asking the user to search for a post, but hey ho:
    currentThread = missingThread; 
}

let threadHeaderHtml = `
    <h3 class="thread-title">${currentThread.title}</h3>
`
threadHeaderParent.insertAdjacentHTML('beforeend', threadHeaderHtml); // converts headerHtml to HTML and adds it to the page at the end of the <header> 

let threadFooterHtml = `
    <div class="thread-footer">
        <p class="thread-timestamp">${new Date(currentThread.date).toLocaleString()}</p>
        <p class="thread-comment-count">${currentThread.comments.length} comments</p>
    </div>
`
threadFooterParent.insertAdjacentHTML("beforeend", threadFooterHtml);

function addComment(comment) {
    let commentHtml = `
        <div class="comment">
            <div class="comment-header">
                <p class="user">${comment.author}</p>
                <p class="comment-ts">${new Date(comment.date).toLocaleString()}</p>
            </div>
            <div class="comment-content">
                ${comment.content}
            </div>
        </div>
    `
    commentsInsertPoint.insertAdjacentHTML('beforeend', commentHtml);
}

// Add the comments from the thread we're loading:
for (let comment of currentThread.comments) {
    addComment(comment);
}

// Set up the event for adding a comment:
const btn = document.querySelector('button');
btn.addEventListener('click', function() {
    const txt = document.querySelector('textarea');
    let comment = {
        content: txt.value,
        date: Date.now(),
        author: 'Andrew'
    }
    addComment(comment);
    txt.value = '';
    currentThread.comments.push(comment); // Add the new comment to the thread in this script
    window.localStorage.setItem('threads', JSON.stringify(threads)); // Add the new comment to the thread in localStorage
})