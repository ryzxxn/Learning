import praw

# Initialize the Reddit API client with your credentials
client = praw.Reddit(client_id='your_client_id',
                       client_secret='your_client_secret',
                       user_agent='your_user_agent')

# Specify the subreddit you're interested in
subreddit = client.subreddit('subreddit_name')

# Get the latest post
latest_post = subreddit.new(limit=1)

print(latest_post[0].title)
