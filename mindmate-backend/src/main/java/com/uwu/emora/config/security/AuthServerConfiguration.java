package com.uwu.emora.config.security;

import com.uwu.emora.config.security.custom.CustomOauthException;
import com.uwu.emora.config.security.custom.CustomTokenEnhancer;
import com.uwu.emora.service.auth.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.common.exceptions.InvalidGrantException;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.security.oauth2.provider.token.TokenEnhancerChain;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

import java.util.Arrays;

import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static com.uwu.emora.config.security.SecurityConstants.*;

@Configuration
@EnableAuthorizationServer
@RequiredArgsConstructor
public class AuthServerConfiguration extends AuthorizationServerConfigurerAdapter {
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final UserService userDetailsService;
    private final CustomTokenEnhancer customTokenEnhancer;
    private final Environment environment;

    @Override
    public void configure(ClientDetailsServiceConfigurer configurer) throws Exception {

        configurer
                .inMemory()

                //PARENT
                .withClient(PARENT_CLIENT_ID)
                .secret(passwordEncoder.encode(""))
                .authorizedGrantTypes(GRANT_TYPE_PASSWORD, AUTHORIZATION_CODE, REFRESH_TOKEN, IMPLICIT)
                .scopes(SCOPE_READ, SCOPE_WRITE, TRUST)
                .accessTokenValiditySeconds(PARENT_ACCESS_TOKEN_VALIDITY_SECONDS)
                .refreshTokenValiditySeconds(PARENT_REFRESH_TOKEN_VALIDITY_SECONDS);
    }

    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) {
        endpoints
                .tokenStore(tokenStore())
                .tokenEnhancer(tokenEnhancer())
                .authenticationManager(authenticationManager)
                .accessTokenConverter(accessTokenConverter())
                .userDetailsService(userDetailsService)
                .exceptionTranslator(exception -> {
                    if (exception instanceof InvalidGrantException)
                        return ResponseEntity.status(UNAUTHORIZED).body(new CustomOauthException("Invalid password!"));
                    else
                        return ResponseEntity.status(UNAUTHORIZED).body(new CustomOauthException(exception.getMessage()));
                });
    }

    @Bean
    public JwtAccessTokenConverter accessTokenConverter() {
        JwtAccessTokenConverter converter = new JwtAccessTokenConverter();
        converter.setSigningKey(TOKEN_SIGN_IN_KEY);
        return converter;
    }

    @Bean
    public TokenStore tokenStore() {
        return new JwtTokenStore(accessTokenConverter());
    }

    @Bean
    public TokenEnhancer tokenEnhancer() {
        TokenEnhancerChain enhancerChain = new TokenEnhancerChain();
        enhancerChain.setTokenEnhancers(Arrays.asList(customTokenEnhancer, accessTokenConverter()));
        return enhancerChain;
    }

}
