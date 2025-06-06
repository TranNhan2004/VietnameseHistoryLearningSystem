package com.vhl.webapi.services.abstraction;

import java.time.Duration;
import java.util.Optional;

public interface RedisService<K, V> {
    Optional<V> get(K key);

    void set(K key, V value, Duration ttl);

    void delete(K key);
}
