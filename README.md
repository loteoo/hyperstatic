# Experimental static site generator

Goals:  

all components in /pages/ folder have routes created for them automatically  

intersection observer to pre-fetch data for links in page view (also pre-laod on hover)  


pluggins:  

on build time, read markdown files & build json files for them, allow pre-render + async load  


<html> should be jsx  
  

build on top of official HA router

all sites have, overall, the same state structure :  

```
export default {
  meta: {
    title: 'Meta title',
    description: 'asdasd',
  },
  location: {
    path: '/asd',
    params: {},
    queryParams: {}
  },
  pages: {
    [page-slug]: {
      ...<page data here>
    }
  }
}
```
