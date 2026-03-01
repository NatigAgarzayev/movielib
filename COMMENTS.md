# Comments & Design Decisions

## 1. Decisions

### Backend
- I decided to use NestJs since it is modular and provides better backend development experience. Also it was in a bonus task.
- I reduced a number of endpoints by adding query params. For example instead '/movies' and '/movies/search', I just added query params: ?search, ?genre, ?page
- I created a global error handler since it is easier to manage from one place and also it closes a really important issue with silent fails at runtime
- Also the same for data that I get from API. I handle all errors and return them in JSON format so front will be able to show it
- Added data transformation so mostly I don't use original keys from API but changed them to my keys by using trasformation function
- I mostly focused on implementation of services and controllers. Also, consistently worked on typing the data.

### Frontend
- I used layer-base approach when I organize files in my frontend project. It is a great organization for small projects. For big projects, I would prefer feature-based or FSD approach
- I used Redux Toolkit for global state. Movies, genres, filters are managed in RTK. 
- Added a middleware that logs duration of async actions because it was asked
- I used CSS modules for styling since I prefer this over styled components and it speed ups development
- I added infinte scroll instead of pagination because I think it more convinient than clicking numbered buttons
- I added debounced search to input so it will not call API request in every keystroke and made it 750ms (not too quick but also not too slow typing)
- I created custom Redux hooks, to type them once and use everywhere without further typing (useAppSelector, useAppDispatch)
- I didn't add React Router Dom since we only have one page
- I made full responsive application for all screen and devices in order to increase UX

---

## 2. AI Disclosure

An AI assistant (Claude by Anthropic) was used during the development of this project as a collaborative tool to guide boilerplate logic, suggest patterns, aslo help with Nest.

**Example prompt used:**
> "So Nest cli uses OOP approach. Is Functional Programming approach not recommended?"

This led to a useful discussion about how NestJS enforces OOP at the structural level (modules, controllers, services) but functional principles can and should be applied inside that structure — for example, pure transformation functions like `transformMovie()`.

**Instance where AI output was sub-optimal:**
When I created an instance for axios, AI added :any type in a catch block. Since we use axios, it has its own error typing that provided from the lib. Basically I replaced :any with AxiosError. 

Another issue was with a slice where it didn't use try/catch block, so I asked AI to add it.

---

## 3. Scalability — First Bottleneck at 10k Requests/Second

The first bottleneck in the current architecture would be the TMDB API rate limit for free users which is 40 requests per second. So it is not the code problem.

Every request to our backend triggers a corresponding request to TMDB. At 10k requests per second, we would hit that limit almost instantly.

If we go beyond the frame of this task we could apply caching technique. For example, Redis and we can revalidate it every like 5 minutes or just buy better plan :)

Let's say we passed this rate limit issue, now the problem is the code itself. Since node.js is single thread language, it will be really easy to trottle the server. Here we can apply techniques from distributed systems.