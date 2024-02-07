package com.uwu.emora.service.auth;

import com.uwu.emora.config.security.SecurityConstants;
import com.uwu.emora.config.security.custom.CustomOauthException;
import com.uwu.emora.dto.auth.CommonUserDetails;
import com.uwu.emora.dto.auth.UserAuthDto;
import com.uwu.emora.entity.Parent;
import com.uwu.emora.enums.UserRole;
import com.uwu.emora.repository.ParentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
public class UserServiceImpl implements UserService {

    private final ParentRepository parentRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UsernamePasswordAuthenticationToken authentication =
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        String clientId = user.getUsername();

        switch (clientId) {

            case SecurityConstants.PARENT_CLIENT_ID:
                Parent parent = this.getParent(username);
                return new UserAuthDto(parent.getId(), username, parent.getPassword(), getRole(UserRole.PARENT),
                        getCommonUserDetailsFromParent(parent));
            default:
                throw new CustomOauthException("Invalid client id");

        }

    }

    private Parent getParent(String username) {
        Optional<Parent> optionalParent = parentRepository.findByUsername(username);
        if (optionalParent.isPresent()) {
            Parent parent = optionalParent.get();
            return parent;
        } else {
            throw new CustomOauthException("You have entered an invalid username or password");
        }
    }

    private CommonUserDetails getCommonUserDetailsFromParent(Parent parent) {
        return new CommonUserDetails(
                null,
                parent.getFirstName(),
                parent.getLastName(),
                parent.getContactNumber(),
                parent.getAddress(),
                parent.getGender()
        );
    }

    /**
     * @param userRole the user role of a searched user
     * @return the user role as authority
     */
    private List<SimpleGrantedAuthority> getRole(UserRole userRole) {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + userRole));
    }
}
