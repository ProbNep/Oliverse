/**
 * ============================================================
 *  OLIVERSE — Customization Configuration
 * ============================================================
 *  Edit everything below to personalize the experience.
 *  - Change login credentials
 *  - Rename planets
 *  - Edit story / memory / message / finale text
 *  - Drop your MP3s into /public/music and update musicLibrary
 *  - Drop cover art into /public/music/covers
 * ============================================================
 */

// 🔐 LOGIN CREDENTIALS — change these to whatever you want
export const CREDENTIALS = {
  username: "olive",
  password: "3926",
};

// 💌 The hidden final message revealed by the distant star
export const HIDDEN_MESSAGE = {
  title: "One Last Secret",
  body:
    "A while ago you told me that i deserve the world, and that is something that you might not b able to give.\n" +
    "but the truth is, i never wanted the whole world.\n" +
    "i wanted a world with you in it. \n\n\n" +
    "And to me, that's worth more than the whole world\n\n" +
    "And when I tell you that I love you more, I don't mean more than you. I mean more than anything else.\n\n" +
    "Because, baby, you are my world.\n\n\n\n" +
    "So if one day you ever find yourself wondering what you mean to me, or whether you're enough.\n\n" +
    " I hope you remember this\n\n" +
    "I never wanted the world.\n\n" +
    "I just wanted you.\n\n" +
    "And somehow, I got lucky enough to have you.\n\n" +
    "That's more than I could have ever asked for.",
  signature: "✦ Always ✦",
};

// 🎵 Music library — add as many tracks as you like.
// Put MP3s in /public/music/ and covers in /public/music/covers/
export type Track = {
  title: string;
  artist: string;
  cover: string; // path or URL
  audio: string; // path or URL
};

export const musicLibrary: Track[] = [
  // Replace these placeholders with your own files.
  { title: "Apocalypse", artist: "CAS", cover: "/public/covers/Apocalypse.jpg", audio: "/public/music/Apocalypse - Cigarettes After Sex - Cigarettes After Sex.mp3" },
  { title: "Nothing's gonna hurt you baby", artist: "CAS", cover: "/public/covers/nghub.jpg", audio: "/music/nghub.mp3" },
  { title: "Sweet", artist: "CAS", cover: "/public/covers/cas.jpg", audio: "/music/sweet.mp3" },
  { title: "Kiss it off me", artist: "CAS", cover: "/public/covers/cas2.jpg", audio: "/public/music/kiom.mp3" },
];

// 🪐 Planets — edit names, colors, and per-planet content
export type Planet = {
  id: string;
  name: string;          // Visible planet name (editable)
  subtitle: string;      // Section subtitle
  color: string;         // Main color (oklch / hex)
  glow: string;          // Glow color
  ring?: boolean;        // Has rings?
  title: string;         // Page heading
  paragraphs: string[];  // Long-form content (supports multiple paragraphs)
  images?: { src: string; alt: string; caption?: string }[];
  // Which tracks (indexes into musicLibrary) make up this planet's playlist
  playlist: number[];
};

export const planets: Planet[] = [
  {
    id: "lumina",
    name: "Lumina",
    subtitle: "Our Story",
    color: "oklch(0.78 0.18 60)",
    glow: "oklch(0.85 0.2 75)",
    ring: false,
    title: "Where It All Began",
    paragraphs: [
      `It's insane how it's been a year since we met, and whats more crazy is that you sent me a msg exactly a year ago on your birthday. Back then, neither of us knew what that random Minecraft server would end up meaning to us.


i was chilling alone, bored so i decided i wanted to play some minecraft, hopped on the minecraft discord and got invited to Synthuism, not expecting much more than another server to play on, owner seemed chill, the community is small but awsome builds, i remember my first base being in a village on a desert, struggled a lot honestly, until we moved into new spawn, got my own area workd my way up into the police force. Then I met you.

Our first encounter wasn't one of those disney romantic moment where we bump into each other with you ''accidently'' dropping your stuff on the ground an allat. It was a horse. I bought a horse from you and, because I was spending dylan's money and not my own, I paid you more diamonds than I probably should have.

That was it.
A simple trade between two players. Looking back now, it's funny how something so small ended up becoming the start of everything, the start of my everything.
As time went on, we started hanging out more. I remember helping you with the fight pit , and I remember looking at your gear and wondering how you had managed to survive for so long using an Efficiency III pickaxe and some of the most random armor enchantments I'd ever seen. So naturally, I fixed your armor, upgraded your tools, and probably acted like I knew everything.


Then came one of my favorite memories, the casino.
I had this idea and somehow convinced myself it was brilliant. I got the permit, built the machines, and got everything working.
I knew it. Everyone knew it. So I came to you for help. And without hesitation, you said yes. What started as a building project became something much bigger.


I still remember the opening day. The excitement. The people. The laughs. The bar on the top floor. Watching everyone gather together in a place that didn't exist before. Then I went on vacation.
i was at my worst but still you kept me updated, checked up on me, showed me how everyone loved and missed something that i've built, we built, it actually made me smile and when I came back, I saw all the changes, all the improvements, and all the love the community had poured into the server. well it was kinda the end of the casino, but, It brought people together.

And in a way, it brought us together too. What I love about these memories is that none of them felt important at the time.
It was just a horse. Just a fight pit. Just a pickaxe. Just a casino.


but somehow, all those little moments added up to something neither of us could have predicted. a year later, when I look back at Synthuism, I think about you.

Because out of everything that happened on that server, meeting you was easily the best thing that came from it.`,
      "\n",
      "\n",
    ],
    images: [],
    playlist: [0],
  },
  {
    id: "memora",
    name: "Memora",
    subtitle: "Our Memories",
    color: "oklch(0.7 0.18 200)",
    glow: "oklch(0.78 0.18 220)",
    ring: true,
    title: "3/2/26",
    paragraphs: [
      "\n",
      `Back then, my feelings were a complete mess.
You knew. I knew you knew.
And somehow, despite both of us knowing, we just never talked about it.
Looking back now, it's honestly funny. I remember getting jealous over the smallest things. At the time I didn't even fully understand why I felt the way I did. I just knew that whenever you were around, my attention somehow ended up on you. The way you laughed. The way you talked. The way you somehow made every day more interesting without even trying. 


I remember admiring you long before I properly understood my own feelings.
Then there was the part where you practically rejected me before you even knew I had feelings. I'm not going to lie That hurt back then. A lot more than I'd ever admit. But in the end, I proved you wrong. And I'm really glad I did.

What I remember most isn't when we got together. It's the first time you said "I love you." 


We were just goofing around, taking screenshots, doing what we always did.
Nothing special. Just us. Then I typed "I love you." like i always do, cause truth be told I had loved you long before I ever said those words seriously.
And when you said it back, I don't think I can properly explain how it felt. People say butterflies. For me, it wasn't butterflies. It felt like a train hit my stomach at full speed. Everything just stopped for a moment. I reread it. Then reread it again.
And then probably a few more times just to make sure it was actually real.
It's one of those moments that stays with you forever.

You'd think that after hearing it so many times it would eventually lose that feeling. But somehow it never has. Even now, every single time you say it, it still makes me smile. No matter how bad my day is. No matter how stressed I am. And no matter what's going on.

Hearing those three words from you somehow makes everything feel lighter.
A few days later, on 3/9/26, we officially got together.

And honestly? It doesn't even feel real sometimes. We've spent practically every day together since then. Even before we started dating, we were always around each other. But after that day, it became us. Us talking. Us laughing. Us staying up too late. Us sharing our days with each other. Us building memories together.
As I'm writing this, we've spent approximately 1,456 hours together since getting together. And that's only counting the time i can actually track.

If we counted every vc we've been in, the number would be much, much higher.
And after all of that, after every conversation, every memory, every laugh, every screenshot, every game, every call, and every moment we've shared...
If I had the chance to go back and do it all over again from the beginning.
I would do it again ten billion times over. And i would 10 billion percent fall for you every single time.


`,
    ],
    images: [],
    playlist: [1],
  },
  {
    id: "cordia",
    name: "Cordia",
    subtitle: "What I Feel",
    color: "oklch(0.7 0.22 350)",
    glow: "oklch(0.78 0.2 10)",
    ring: false,
    title: "Random thoughts",
    paragraphs: [
      "\n",
      `its currently 9 am for you, its 2 days before your birthday, ive been working on this thing for a while now, kinda changing the whole idea every a few days, but hopefully hopefully this one sticks, honestly?, i dont know what i'll be talking about here but, there is a lot i wanna say, but i dont have the time to say it, were usually playing or watching and were both focused like dont get me wrong i love it, but the thing is i would love us to be talking more, it'll take time specially after everything that happened. ( youre breathing in my ear rn, fucking adorable)


but sometimes it makes me feel like i am putting too much effort and not getting anything back, makes me wonder how you feel, wondering if you lost feeling, and if i am too much, but then you switch up, and everything changes, you give me all the love and attention that i was wondering where it went, and its just a cycle, my brain thinks of the worst, and i hate, so much, but deep down i know you dont mean to do so, and i can hear you thinking about apologizing for like the 100th time but you dont have to, you have a lot on your mind, and i cant imagine how hard for you everyting is right now, but if there is a small possibilty of me to help you in anyway, dont take it away from me, i want to be the person who lends you a hand, get you through your worst days, makes you smile when you dont feel like smiling, cause a while ago you were this person to me.`,
      "i want you to be comfortable sharing anything without worrying about me judging you, i've fell for every version of you in ways i couldn't imagine, and i wanna keep doing it.",
    ],
    images: [],
    playlist: [2],
  },
  {
    id: "finis",
    name: "Finis",
    subtitle: "Happy Birthday",
    color: "oklch(0.72 0.2 300)",
    glow: "oklch(0.82 0.2 320)",
    ring: true,
    title: "Happy Birthday, My Universe",
    paragraphs: [
      "I spent a longtime thinking about what i wanted to write here.\nnot because i had nothing to say, but because there are so many things i wish i could put into words, and somehow none of them ever feel big enough.\n\n\ni hope today is filled with the kind of happiness you bring to other people without even realizing it. i hope you spend today smiling. i hope you feel appreciated, and loved. not just by me, by everyone else whose life is better because youre in it.\n\n\nSometimes i wonder if you realize how much light and joy you bring into the lives of the people around you, how your laugh making things feel lighter and your presence can turn an ordinary day into one worth remembering, how simply being yourself has a way of making people feel comfortable, understood and cared for. i dont think people tell you that enough, you deserve to be celebrated and be reminded of how special you are. not because its your birthday, because it's true every other day of the year too\n\n\nAs you start another year of your life, i hope you continue being unapologetically yourself.\n\n\nKeep laughing at things you find funny. being stubborn when it matters, being the person i know and love.\n\n\nThere are billions of people in this world and somehow there is only one you. \nand i think thats something worth celebrating. so today take a moment to be proud of yourself for how far you've come, for the challanges you've overcome, for every version of youself that had to exist for you to become the person you are, i know the future has incredible things waiting for you. and i cant wait to watch you achieve them.\n\n\nHappy birthday, Olivia.\nMay this year be kinder, brighter, and even more beautiful than the last.\nYou deserve nothing less.\n\n\nWith all my love.\n  Your handsome and tall and very very cool boyfriend",
      "\n",
      "\n",
      "Now look up. Somewhere out in the distance, a tiny star is waiting for you to find it…",
    ],
    images: [],
    playlist: [3],
  },
];