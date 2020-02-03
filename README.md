# Personal Website Front-End
This repository/project is just a fun project that I use to play around with front-end development. Since it's not something I do for my job, but it's something I enjoy. Plus it also gives me a creative space online to showcase my software development skills.

# Run
Since this project is containerized with Docker, you can run the front-end piece with a simple bash script that's included in this repository. This does not run the back-end services though, to run those you must run `docker-compose up`, but then you also need to configure the secrets. Thus the easiest thing is just to run the source contained in this repository:
```
./run.sh
```

# Future Improvements

1.  I've been trying to keep this website as lightweight as possible where the Docker container actually "compiles" the JSX to Browser Javascript which contains all of the website. However, this can be improved using materials-ui to actually render the CSS and website seperately. This still keeps the front-end very light as I don't have to run NodeJS in the background and can just have nginx serve "static content", but makes SEO a little bit better.

2.  I can also make it easier to make changes during development by running NodeJS to see changes almost instantly rather than recreating the container every time which is quite slow.

# Technologies
- docker
- nginx
- react
- materials-ui
