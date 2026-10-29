package br.com.organicreach.security;
import org.springframework.context.annotation.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
@Configuration
public class SecurityConfig {
 @Bean PasswordEncoder passwordEncoder(){return new BCryptPasswordEncoder();}
 @Bean UserDetailsService users(@Value("${ADMIN_USERNAME:}") String username,@Value("${ADMIN_PASSWORD:}") String password,PasswordEncoder encoder){
  if(username.isBlank()||password.length()<16)throw new IllegalStateException("Defina ADMIN_USERNAME e ADMIN_PASSWORD (mínimo 16 caracteres)");
  return new InMemoryUserDetailsManager(User.withUsername(username).password(encoder.encode(password)).roles("ADMIN").build());
 }
 @Bean SecurityFilterChain filterChain(HttpSecurity http)throws Exception{
  return http
   .csrf(csrf->csrf.disable()) // API sem cookies: apenas Basic Auth; reavaliar se adicionar sessão.
   .sessionManagement(s->s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
   .authorizeHttpRequests(a->a.requestMatchers("/actuator/health").permitAll().anyRequest().authenticated())
   .httpBasic(Customizer.withDefaults())
   .build();
 }
}
