package com.vhl.webapi.services.impl;

import com.vhl.webapi.services.interfaces.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RedisServiceImpl<K, V> implements RedisService<K, V> {
    private final RedisTemplate<K, V> redisTemplate;

    @Override
    public Optional<V> get(K key) {
        return Optional.ofNullable(redisTemplate.opsForValue().get(key));
    }

    @Override
    public void set(K key, V value, Duration ttl) {
        redisTemplate.opsForValue().set(key, value, ttl);
    }

    @Override
    public void delete(K key) {
        redisTemplate.delete(key);
    }
}
