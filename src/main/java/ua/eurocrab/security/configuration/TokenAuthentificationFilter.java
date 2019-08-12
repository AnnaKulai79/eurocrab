package ua.eurocrab.security.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.filter.GenericFilterBean;
import ua.eurocrab.security.TokenUtils.TokenTool;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TokenAuthentificationFilter extends GenericFilterBean {

    @Value("${external.url.pattern}")
    private String externalUrlPattern;

    @Value("${external.static.images.pattern}")
    private String imagesUrlPattern;

    @Value("${external.static.uploads_images.pattern}")
    private String uploadImagesUrlPattern;

    @Value("${external.static.css.pattern}")
    private String cssUrlPattern;

    @Value("${external.static.js.pattern}")
    private String jsUrlPattern;

    @Value("${external.static.include.pattern}")
    private String includeUrlPattern;

    @Value("${external.static.trackbar.pattern}")
    private String trackbarUrlPattern;

    @Value("${external.static.ckeditor.pattern}")
    private String ckeditorUrlPattern;

    @Value("${external.static.fancybox.pattern}")
    private String fancyboxUrlPattern;

    @Value("${token.header}")
    private String tokenHeader;

    @Value("${token.uri.param}")
    private String accessToken;

    @Value("${external.url.pattern.login}")
    private String patternAdditional;

    @Value("${external.static.favicon.pattern}")
    private String faviconPath;

    @Autowired
    private TokenTool tokenTools;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;

        System.out.println("error in if where external - start of all");

        List<String> urlPatterns = Arrays.asList(externalUrlPattern, ckeditorUrlPattern, trackbarUrlPattern, includeUrlPattern,
                patternAdditional, imagesUrlPattern, uploadImagesUrlPattern, fancyboxUrlPattern,
                cssUrlPattern, jsUrlPattern, faviconPath);
        AtomicBoolean whetherNeedToExitMethod = new AtomicBoolean(false);
        urlPatterns.forEach(x -> {
            if (x != null && !x.isEmpty()) {
                Pattern p = Pattern.compile(x);
                String s = ((HttpServletRequest) request).getRequestURI();
                Matcher m = p.matcher(s);
                if(!whetherNeedToExitMethod.get()) {
                    if (m.find()) {
                        try {
                            whetherNeedToExitMethod.set(true);
                            chain.doFilter(request, response);
                        } catch (IOException e) {
                            System.out.println("IOException !!!!");
                        } catch (ServletException e) {
                            System.out.println("ServletException !!!!");
                        }
                    }
                }
            }
        });

        System.out.println("error in part before if-construction");

        if (httpRequest.getMethod().equals(RequestMethod.OPTIONS.name())) {
            chain.doFilter(request, response);
            return;
        }

        System.out.println("error in full token");

        String fullToken = httpRequest.getHeader(tokenHeader);
        System.out.println("FullToken is : " + fullToken);
        if (StringUtils.isEmpty(fullToken)) {
            fullToken = httpRequest.getParameter(accessToken);
            fullToken = "Bearer " + fullToken;
            if (StringUtils.isEmpty(fullToken)) {
                setErrorResponse(response, "No bearer token available");
                return;
            }
            System.out.println("FullToken is : " + fullToken);
        }

        System.out.println("error in valid boolean(second part)");

        String authToken = null;
        authToken = fullToken.substring("Bearer".length() + 1, fullToken.length());
        System.out.println("AuthToken is : " + authToken);

        boolean valid = tokenTools.isTokenValid(authToken);
        if (!valid) {
            setErrorResponse(response, "Token is not valid");
            return;
        }

        System.out.println("error in set user");

        UserDetails userDetails = tokenTools.getUserByToken(authToken);
        UsernamePasswordAuthenticationToken userPassToken = new UsernamePasswordAuthenticationToken(userDetails,
                null, userDetails.getAuthorities());
        userPassToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpRequest));
        SecurityContextHolder.getContext().setAuthentication(userPassToken);
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        httpResponse.addHeader("Access-Control-Allow-Origin", "*");
        chain.doFilter(request, response);
    }

    private void setErrorResponse(ServletResponse response, String msg) throws IOException {
        ((HttpServletResponse) response).setHeader("WWW-Authenticate", "Bearer realm=\"Service\", error=\"invalid_grant\", error_description=\"" + msg + ".\"");
        try {
            ((HttpServletResponse) response).sendError(HttpServletResponse.SC_UNAUTHORIZED, "Access denied");
        } catch (IllegalStateException e){
            System.out.println("IllegalStateException was catched !!!");
        }
    }

    private void traceSession(ServletRequest request) {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        Enumeration<String> headerNames = httpRequest.getHeaderNames();

    }
}
