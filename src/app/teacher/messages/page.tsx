import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Send, Paperclip, MoreHorizontal } from "lucide-react";
import Image from "next/image";

export default function TeacherMessagesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#1e1e1e]">Messages</h1>
        <Button className="bg-[#702dff] hover:bg-[#5811f2]">New Message</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contacts List */}
        <Card className="border-none shadow-sm lg:col-span-1">
          <CardContent className="p-0">
            <div className="p-4 border-b">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  placeholder="Search contacts..."
                  className="pl-10 bg-white border-none"
                />
              </div>
            </div>

            <div className="h-[600px] overflow-y-auto">
              {contacts.map((contact, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-4 border-b hover:bg-gray-50 cursor-pointer ${
                    contact.active ? "bg-gray-50" : ""
                  }`}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-[#d9d9d9]">
                      <Image
                        src="/placeholder.svg?height=48&width=48"
                        alt={contact.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {contact.unread > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#702dff] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">
                          {contact.unread}
                        </span>
                      </div>
                    )}
                    {contact.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-medium truncate">{contact.name}</p>
                      <p className="text-xs text-[#6b7280]">{contact.time}</p>
                    </div>
                    <p className="text-sm text-[#6b7280] truncate">
                      {contact.lastMessage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="border-none shadow-sm lg:col-span-2">
          <CardContent className="p-0">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#d9d9d9]">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Parent"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">Jennifer Wilson (Alex's Parent)</p>
                  <p className="text-xs text-[#6b7280]">Online</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>

            {/* Chat Messages */}
            <div className="h-[500px] overflow-y-auto p-4 space-y-4">
              <div className="text-center">
                <span className="text-xs text-[#6b7280] bg-gray-100 px-2 py-1 rounded-full">
                  Today
                </span>
              </div>

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sent ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sent
                        ? "bg-[#702dff] text-white rounded-br-none"
                        : "bg-gray-100 text-[#1e1e1e] rounded-bl-none"
                    }`}
                  >
                    <p>{message.text}</p>
                    <p
                      className={`text-xs mt-1 text-right ${
                        message.sent ? "text-white/70" : "text-[#6b7280]"
                      }`}
                    >
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  className="bg-white border-none"
                />
                <Button size="icon" className="bg-[#702dff] hover:bg-[#5811f2]">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const contacts = [
  {
    name: "Jennifer Wilson (Alex's Parent)",
    lastMessage: "Thank you for the update on Alex's progress.",
    time: "10:30 AM",
    unread: 0,
    online: true,
    active: true,
  },
  {
    name: "Michael Brown (Emma's Parent)",
    lastMessage: "When is the next parent-teacher meeting?",
    time: "Yesterday",
    unread: 2,
    online: false,
    active: false,
  },
  {
    name: "Sarah Davis (Noah's Parent)",
    lastMessage: "Noah will be absent tomorrow due to a doctor's appointment.",
    time: "Yesterday",
    unread: 0,
    online: true,
    active: false,
  },
  {
    name: "Robert Johnson (Olivia's Parent)",
    lastMessage: "I'd like to discuss Olivia's math performance.",
    time: "2 days ago",
    unread: 0,
    online: false,
    active: false,
  },
  {
    name: "Emily Taylor (Liam's Parent)",
    lastMessage: "Liam really enjoyed the science experiment today!",
    time: "3 days ago",
    unread: 0,
    online: false,
    active: false,
  },
  {
    name: "David Miller (Sophia's Parent)",
    lastMessage: "Can you recommend some additional reading materials?",
    time: "1 week ago",
    unread: 0,
    online: false,
    active: false,
  },
  {
    name: "Lisa Anderson (Jackson's Parent)",
    lastMessage: "Jackson is having trouble with fractions.",
    time: "1 week ago",
    unread: 0,
    online: false,
    active: false,
  },
];

const messages = [
  {
    text: "Good morning Ms. Johnson! I wanted to check in on Alex's progress in mathematics.",
    time: "10:15 AM",
    sent: false,
  },
  {
    text: "Good morning Mrs. Wilson! Alex is doing very well in mathematics. He's showing excellent progress in multiplication and division.",
    time: "10:18 AM",
    sent: true,
  },
  {
    text: "That's great to hear! He's been practicing at home as well. Is there anything specific we should focus on?",
    time: "10:20 AM",
    sent: false,
  },
  {
    text: "I'd recommend practicing more word problems to help him apply these skills in real-world contexts. I can send some practice sheets if you'd like.",
    time: "10:22 AM",
    sent: true,
  },
  {
    text: "That would be very helpful! Thank you for the suggestion.",
    time: "10:25 AM",
    sent: false,
  },
  {
    text: "You're welcome! I'll prepare some materials and send them by the end of the day. Alex is a bright student and I'm happy to see his enthusiasm for learning.",
    time: "10:28 AM",
    sent: true,
  },
  {
    text: "Thank you for the update on Alex's progress. We appreciate your dedication to his education.",
    time: "10:30 AM",
    sent: false,
  },
];
