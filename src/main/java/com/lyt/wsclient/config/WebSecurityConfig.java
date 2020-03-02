package com.lyt.wsclient.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.firewall.DefaultHttpFirewall;
import org.springframework.security.web.firewall.HttpFirewall;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/","/indexC/loginPage", "/indexC/TestWebSocketPage","/userC/login","/login-error","/401","/css/**","/js/**","/images/**").permitAll()
                .antMatchers(HttpMethod.POST,"/MemberLogin/checkVerify").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin().loginPage( "/indexC/loginPage" ).failureUrl( "/login-error" )
                .and()
                .exceptionHandling().accessDeniedPage( "/401" );
        http.logout().logoutSuccessUrl( "/member/login" );
//        http.headers().frameOptions().disable();//增加这句
    }

    

    @Bean
    public HttpFirewall httpFirewall() {
        return new DefaultHttpFirewall();
    }


}
