# UI Integration

## Basic Requirements

**Frontend**: Ease of use, scalability, performance, testing, familiarity

- Library/framework
- CSS library/framework

**Backend**: Compatibility with ML libraries, speed of setup, performance handling and reading large datasets

## Possible Choices

### Frontend

- **React.js**/**Angular**/**Vue**

  - Familiarity across team members with React
  - React.js has better performance displaying large datasets. Would have to use extra tools if using Angular to handle the large datasets [1]
  - All have respective testing libraries

- **Next.js** for quicker setup, simple routing, SSR (most likely useless in this scenario)

<br>

- CSS tools
  - **MUI** -> "Google" styling, quick setup, easy to use, has many customizable graph/table components
  - **Semantic UI** -> very easy and quick to use, not very customizable
  - **Bootstrap** -> fast development, very consistent, less customizable than MUI
  - **Tailwind** -> will require more design work, but very customizable and easy to use, comes out of the box with next.js if wanted

## Backend

- **Django** Very fast, secure, and scalable. However, it it a little hard to setup and is very complex. Its good for large complex applications and relational databases
- **Flask** Simple set up microframework, good all around, not as good in all the departments as the other options, but extremely easy to setup. Will require other packages as its only a microframework, but this provides flexibility for features based on our needs
- **FastAPI** Fullstack framework, extremely fast performance, but user friendly dev experience. Many out-of-box features

## References

https://academysmart.com/react-vs-angular-which-one-is-best-for-your-project/

https://www.linkedin.com/pulse/django-vs-flask-fastapi-which-python-web-framework-right-gopi-maran/

https://medium.com/@romulo.gatto/fastapi-vs-flask-the-ultimate-showdown-of-python-web-frameworks-1f2700ac8852#:~:text=Key%20differences%20between%20Flask%20and%20FastAPI&text=FastAPI%20is%20faster%20than%20Flask,community%20and%20ecosystem%20than%20FastAPI.

https://www.youtube.com/watch?v=OwxxCibSFKk

https://github.com/norahsakal/flask-pytorch-backend
