package ua.eurocrab;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(
                "/webjars/**",
                "/ckeditor/**",
                "/images/**",
                "/fancybox/**",
                "/include/**",
                "/trackbar/**",
                "/uploads_images/**",
                "/css/**",
                "/js/**")
                .addResourceLocations(
                        "classpath:/META-INF/resources/webjars/",
                        "classpath:/static/ckeditor/",
                        "classpath:/static/images/",
                        "classpath:/static/fancybox/",
                        "classpath:/static/include/",
                        "classpath:/static/trackbar/",
                        "classpath:/static/uploads_images/",
                        "classpath:/static/css/",
                        "classpath:/static/js/");
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:images/");
        registry.addResourceHandler("/uploads_images/**")
                .addResourceLocations("file:uploads_images/");
    }

}
