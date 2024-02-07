package com.uwu.emora.config.security;

public class SecurityConstants {
    public static final String PARENT_CLIENT_ID = "parent";

    protected static final int PARENT_ACCESS_TOKEN_VALIDITY_SECONDS = 2 * 60 * 60;
    protected static final int PARENT_REFRESH_TOKEN_VALIDITY_SECONDS = 24 * 60 * 60;
    protected static final String GRANT_TYPE_PASSWORD = "password";
    protected static final String AUTHORIZATION_CODE = "authorization_code";
    protected static final String REFRESH_TOKEN = "refresh_token";
    protected static final String IMPLICIT = "implicit";
    protected static final String SCOPE_READ = "read";
    protected static final String SCOPE_WRITE = "write";
    protected static final String TRUST = "trust";
    protected static final String TOKEN_SIGN_IN_KEY = "$2a$10$ra18vjdqaM3wgBoXmqn8yOhyJtlbqNHVYuOEvDzBj5NDC1U.Lt6d2";
}
