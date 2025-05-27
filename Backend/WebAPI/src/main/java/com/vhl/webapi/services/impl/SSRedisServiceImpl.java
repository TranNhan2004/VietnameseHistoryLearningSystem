package com.vhl.webapi.services.impl;

import com.vhl.webapi.services.interfaces.SSRedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SSRedisServiceImpl implements SSRedisService {
    private final @Qualifier("stringRedisTemplate") RedisTemplate<String, String> stringRedisTemplate;

    @Override
    public Optional<String> get(String key) {
        return Optional.ofNullable(stringRedisTemplate.opsForValue().get(key));
    }

    @Override
    public void set(String key, String value, Duration ttl) {
        stringRedisTemplate.opsForValue().set(key, value, ttl);
    }

    @Override
    public void delete(String key) {
        stringRedisTemplate.delete(key);
    }
}
