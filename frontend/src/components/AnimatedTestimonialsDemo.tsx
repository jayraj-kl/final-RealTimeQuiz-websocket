import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
        quote:
          "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
        name: "Jayraj Ladkat",
        designation: "Operations Director at CloudScale",
        src: "https://myfsd2bucket.s3.ap-south-1.amazonaws.com/jayraj2.jpeg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCmFwLXNvdXRoLTEiSDBGAiEAt%2BuPeJJ5jSt8D4PLIf%2B%2FRHa9IA2RpWLu147NaEfdo8gCIQDjkI5CWdohPXENUx09L9%2FJg3ay8wMIXg7sQKQg1If1FyrUAwiu%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDk3NTA1MDMxMjczMyIMOoGc3b3KE5nra6OjKqgDsu4jRsIV3SuCZd2Q0X%2Byxw3WRrFKKGIUtFUnhZF9cgTnxNJcGCXQtoJEy5zXrw355WObeBf20W%2Bxbis0QnChLyJhgfouOqgj22Qre7JVM4JipYjCHouxlct%2B0rt7CV7zqleMClAJ4QciHHwwiO2pEoRLwLB6KRIGphYVrxD7Rb5A5iIkYf1a5%2FMU3WxqGC0DnYW4v0J0SCQfHFMibw0%2FNr90k3munHOBht86Wyz3lQ%2FtunYdsSJhPOv8Z%2FOFu0UE%2FLjTT6s1fkT3iJWzZDUe5YxgGAb1do5bv3KqF4BdY6WUv2lapxAvGTshZLD7tkZzMCnyjazJTHPB9B6hh8F3bVUgi5%2FzmeFM2jolVgULQ5t%2FsKNDyxaNcWnUxDWF73Chrzc95S78sVJf35G7gypbFyOZN5jcLAGGoh27LXBJjirnqKw24QX6oFAevnRpqOhinm%2FsFu3qKSBSc8ujYDsNteGe6H5gPnep1AkOntIPzZ7Ma2kvvnWyI5ty2%2B%2BkNW7CtC6GdrskBfwMmvw9hA6Xy54YKVd%2BNQG4vyxnYu02vYAKAFHnZNhb6jC8w8m5BjrjAsUp5xtA0pT0XhduL2mj%2F7GOhSA68Z2qf0bN8yiu9oM6m7Uwj0BE1DGglPeFwjFH2MsOm8lJlu7MgfYxcPp6rkpWlBFZm0TDSf%2BdGm0NmnC%2B2pyN3GtfIk7fFjJ6oD6%2Bg%2F%2FDTlMiv8BMp1vc%2FKBWfJr41o1PtpmfWwTubLsmRbawVDUDrI86HzBhsUM9Djljio6x%2FWiY0IGCGuhyyYLubZLLeJXDHJP3eBvMj%2Bh33yJDWEG38GBShYSAgOvVQPaBzYEnt6rueziw4lqX%2B2hBzSNBb13EWAqKvFuLj762rdtq%2FK%2BoV0XCrAg4NFaahRAKoL4pjpwQHrajjpckHfqut%2BoDTGrHREF%2B8yfAQ1Pi61WTyKHmIKq8SeXtfqBzMATfkUYIAovQkzMqy0LsRiJdxKp%2Fk8hepsz%2FYBVUOLLw%2F7EaRhjucyq5SWuVFoCyi6iGj7%2BhpY1PNT%2F1jbdqa9kdT2pRZuE%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA6GBMHBQO2DFXUAEJ%2F20241111%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20241111T204837Z&X-Amz-Expires=43200&X-Amz-SignedHeaders=host&X-Amz-Signature=c7746a1af16abd889ec177d791b74175fab9399e7991d65f74148062876fd13f",
      },
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sneha Jagtap",
      designation: "Product Manager at TechFlow",
      src: "https://media-bom1-2.cdn.whatsapp.net/v/t61.24694-24/462713627_1279157749639857_6400433750980288271_n.jpg?ccb=11-4&oh=01_Q5AaIB8nuv5P1PSMtLF1MPQrkSKL9HYthrLveXKn5uZNlLGo&oe=673F9797&_nc_sid=5e03e0&_nc_cat=106",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Aditya Jain",
      designation: "CTO at InnovateSphere",
      src: "https://media-bom1-2.cdn.whatsapp.net/v/t61.24694-24/455847180_1758581671637836_652845248034808247_n.jpg?ccb=11-4&oh=01_Q5AaIPSHED8rCdKYS0YbCPADw0u5thBx0CF4cc2zfJh8-gbG&oe=673EFC9C&_nc_sid=5e03e0&_nc_cat=103",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "Rahul Nair",
      designation: "Engineering Lead at DataPro",
      src: "https://myfsd2bucket.s3.ap-south-1.amazonaws.com/rahul.jpeg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCmFwLXNvdXRoLTEiSDBGAiEAt%2BuPeJJ5jSt8D4PLIf%2B%2FRHa9IA2RpWLu147NaEfdo8gCIQDjkI5CWdohPXENUx09L9%2FJg3ay8wMIXg7sQKQg1If1FyrUAwiu%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDk3NTA1MDMxMjczMyIMOoGc3b3KE5nra6OjKqgDsu4jRsIV3SuCZd2Q0X%2Byxw3WRrFKKGIUtFUnhZF9cgTnxNJcGCXQtoJEy5zXrw355WObeBf20W%2Bxbis0QnChLyJhgfouOqgj22Qre7JVM4JipYjCHouxlct%2B0rt7CV7zqleMClAJ4QciHHwwiO2pEoRLwLB6KRIGphYVrxD7Rb5A5iIkYf1a5%2FMU3WxqGC0DnYW4v0J0SCQfHFMibw0%2FNr90k3munHOBht86Wyz3lQ%2FtunYdsSJhPOv8Z%2FOFu0UE%2FLjTT6s1fkT3iJWzZDUe5YxgGAb1do5bv3KqF4BdY6WUv2lapxAvGTshZLD7tkZzMCnyjazJTHPB9B6hh8F3bVUgi5%2FzmeFM2jolVgULQ5t%2FsKNDyxaNcWnUxDWF73Chrzc95S78sVJf35G7gypbFyOZN5jcLAGGoh27LXBJjirnqKw24QX6oFAevnRpqOhinm%2FsFu3qKSBSc8ujYDsNteGe6H5gPnep1AkOntIPzZ7Ma2kvvnWyI5ty2%2B%2BkNW7CtC6GdrskBfwMmvw9hA6Xy54YKVd%2BNQG4vyxnYu02vYAKAFHnZNhb6jC8w8m5BjrjAsUp5xtA0pT0XhduL2mj%2F7GOhSA68Z2qf0bN8yiu9oM6m7Uwj0BE1DGglPeFwjFH2MsOm8lJlu7MgfYxcPp6rkpWlBFZm0TDSf%2BdGm0NmnC%2B2pyN3GtfIk7fFjJ6oD6%2Bg%2F%2FDTlMiv8BMp1vc%2FKBWfJr41o1PtpmfWwTubLsmRbawVDUDrI86HzBhsUM9Djljio6x%2FWiY0IGCGuhyyYLubZLLeJXDHJP3eBvMj%2Bh33yJDWEG38GBShYSAgOvVQPaBzYEnt6rueziw4lqX%2B2hBzSNBb13EWAqKvFuLj762rdtq%2FK%2BoV0XCrAg4NFaahRAKoL4pjpwQHrajjpckHfqut%2BoDTGrHREF%2B8yfAQ1Pi61WTyKHmIKq8SeXtfqBzMATfkUYIAovQkzMqy0LsRiJdxKp%2Fk8hepsz%2FYBVUOLLw%2F7EaRhjucyq5SWuVFoCyi6iGj7%2BhpY1PNT%2F1jbdqa9kdT2pRZuE%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA6GBMHBQO2DFXUAEJ%2F20241111%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20241111T205105Z&X-Amz-Expires=43200&X-Amz-SignedHeaders=host&X-Amz-Signature=7fa331541477460055f805a2044b647aae39e6ca0b3fa23de6e5c8fea26bd469",
    }
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
