
import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Heart, ThumbsUp, Send, Plus, Image, PlusCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  image?: string;
  createdAt: Date;
  likes: number;
  liked: boolean;
  comments: Comment[];
}

interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: Date;
}

// Sample data for the community page
const SAMPLE_POSTS: Post[] = [
  {
    id: "1",
    author: {
      id: "user-1",
      name: "Maria Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    content: "Just harvested my first batch of organic tomatoes! The heirloom varieties have incredible flavor this year. Has anyone tried the 'Cherokee Purple' variety? I'm thinking of adding it to my garden next season.",
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRvbWF0byUyMGhhcnZlc3R8ZW58MHx8MHx8fDA%3D",
    createdAt: new Date("2025-04-02T14:32:00"),
    likes: 24,
    liked: false,
    comments: [
      {
        id: "c1",
        author: {
          id: "user-2",
          name: "James Wilson",
          avatar: "https://i.pravatar.cc/150?img=2",
        },
        content: "Cherokee Purple is amazing! I grew them last year and they have a rich, sweet flavor. They do require careful staking though as they get quite heavy.",
        createdAt: new Date("2025-04-02T15:45:00"),
      },
      {
        id: "c2",
        author: {
          id: "user-3",
          name: "Sarah Johnson",
          avatar: "https://i.pravatar.cc/150?img=3",
        },
        content: "Those look fantastic! What fertilizer regimen are you using?",
        createdAt: new Date("2025-04-02T16:12:00"),
      },
    ],
  },
  {
    id: "2",
    author: {
      id: "user-4",
      name: "Michael Thompson",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    content: "I've been experimenting with companion planting this season. Marigolds around the vegetable beds have significantly reduced pest issues. Anyone else have good companion planting combinations to share?",
    createdAt: new Date("2025-04-01T09:15:00"),
    likes: 18,
    liked: true,
    comments: [
      {
        id: "c3",
        author: {
          id: "user-5",
          name: "Emma Davis",
          avatar: "https://i.pravatar.cc/150?img=5",
        },
        content: "Basil and tomatoes are a great combo! Basil repels tomato hornworms and improves flavor. I also plant nasturtiums as a sacrificial crop to attract aphids away from my vegetables.",
        createdAt: new Date("2025-04-01T10:22:00"),
      },
    ],
  },
  {
    id: "3",
    author: {
      id: "user-6",
      name: "David Garcia",
      avatar: "https://i.pravatar.cc/150?img=6",
    },
    content: "Has anyone used drip irrigation systems in their gardens? I'm considering installing one to save water and provide consistent moisture to my plants. Any brand recommendations or installation tips?",
    createdAt: new Date("2025-03-30T16:45:00"),
    likes: 12,
    liked: false,
    comments: [],
  },
];

export default function Community() {
  const { isAuthenticated, user } = useAuth();
  const [posts, setPosts] = useState<Post[]>(SAMPLE_POSTS);
  const [newPostContent, setNewPostContent] = useState("");
  const [commentContents, setCommentContents] = useState<Record<string, string>>({});

  const handleLikePost = (postId: string) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
            liked: !post.liked,
          };
        }
        return post;
      })
    );
  };

  const handleAddComment = (postId: string) => {
    if (!commentContents[postId]?.trim()) return;

    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id === postId) {
          const newComment: Comment = {
            id: `c${Date.now()}`,
            author: {
              id: user?.id || "guest",
              name: user?.username || "Guest User",
            },
            content: commentContents[postId],
            createdAt: new Date(),
          };

          return {
            ...post,
            comments: [...post.comments, newComment],
          };
        }
        return post;
      })
    );

    // Clear the comment input
    setCommentContents({
      ...commentContents,
      [postId]: "",
    });
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: {
        id: user?.id || "guest",
        name: user?.username || "Guest User",
      },
      content: newPostContent,
      createdAt: new Date(),
      likes: 0,
      liked: false,
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
  };

  // Helper function to format dates
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.round(diffMs / 60000);
    const diffHrs = Math.round(diffMin / 60);
    const diffDays = Math.round(diffHrs / 24);

    if (diffMin < 60) {
      return `${diffMin} minute${diffMin !== 1 ? "s" : ""} ago`;
    } else if (diffHrs < 24) {
      return `${diffHrs} hour${diffHrs !== 1 ? "s" : ""} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="h-full leaf-background">
      <div className="container py-6">
        <PageHeader
          title="Farming Community"
          description="Connect with other farmers, share experiences, and learn from each other"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post Card */}
            <Card>
              <CardHeader>
                <CardTitle>Share with the community</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder={isAuthenticated ? "What's on your mind?" : "Login to share your thoughts..."}
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  disabled={!isAuthenticated}
                  className="min-h-[120px]"
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" disabled={!isAuthenticated}>
                  <Image className="h-4 w-4 mr-2" />
                  Add Image
                </Button>
                <Button
                  onClick={handleCreatePost}
                  disabled={!isAuthenticated || !newPostContent.trim()}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Post
                </Button>
              </CardFooter>
            </Card>

            {/* Posts */}
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{post.author.name}</CardTitle>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(post.createdAt)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-line">{post.content}</p>
                    {post.image && (
                      <div className="mt-4">
                        <img
                          src={post.image}
                          alt="Post attachment"
                          className="rounded-md max-h-[400px] w-full object-cover"
                        />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="pt-0 flex flex-col items-start space-y-4">
                    <div className="flex items-center space-x-4 w-full">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleLikePost(post.id)}
                        disabled={!isAuthenticated}
                      >
                        {post.liked ? (
                          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        ) : (
                          <Heart className="h-4 w-4" />
                        )}
                        <span>{post.likes}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments.length}</span>
                      </Button>
                    </div>

                    {/* Comments section */}
                    {post.comments.length > 0 && (
                      <div className="w-full border-t pt-4 space-y-4">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="flex space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={comment.author.avatar} />
                              <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="bg-muted p-3 rounded-lg">
                                <div className="flex justify-between items-start">
                                  <div className="font-medium">{comment.author.name}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {formatDate(comment.createdAt)}
                                  </div>
                                </div>
                                <p className="text-sm mt-1">{comment.content}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add comment input */}
                    {isAuthenticated && (
                      <div className="w-full flex items-center space-x-2 pt-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {user?.username?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <Input
                          placeholder="Write a comment..."
                          value={commentContents[post.id] || ""}
                          onChange={(e) =>
                            setCommentContents({
                              ...commentContents,
                              [post.id]: e.target.value,
                            })
                          }
                          className="flex-1"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleAddComment(post.id);
                            }
                          }}
                        />
                        <Button
                          size="icon"
                          onClick={() => handleAddComment(post.id)}
                          disabled={!commentContents[post.id]?.trim()}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* Community Topics */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Topics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { name: "Organic Farming", count: 28 },
                  { name: "Pest Management", count: 24 },
                  { name: "Irrigation Systems", count: 19 },
                  { name: "Soil Health", count: 17 },
                  { name: "Sustainable Practices", count: 15 },
                ].map((topic) => (
                  <div
                    key={topic.name}
                    className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer"
                  >
                    <span>{topic.name}</span>
                    <span className="text-muted-foreground text-sm">
                      {topic.count} posts
                    </span>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  View All Topics
                </Button>
              </CardFooter>
            </Card>

            {/* Community Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Spring Planting Workshop</h3>
                  <p className="text-sm text-muted-foreground">
                    April 12, 2025 • 10:00 AM - 12:00 PM
                  </p>
                  <p className="text-sm">
                    Learn best practices for spring vegetable planting and seed starting.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Beekeeping Basics</h3>
                  <p className="text-sm text-muted-foreground">
                    April 18, 2025 • 2:00 PM - 4:00 PM
                  </p>
                  <p className="text-sm">
                    Introduction to beekeeping and its benefits for crop pollination.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Events
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
