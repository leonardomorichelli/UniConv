<?php

namespace App\Common;

class Helpers
{
    /**
     * Executes a redirection to the provided url (or return the target url).
     *
     * @param string $query      The target url
     *
     * @return array query_array: ['url', 'parameters']
     *
     */
    public static function explode_query($query): array
    {
        if (strpos($query, '?') !== false) {
            $array = explode('?', $query);
            $url = $array[0];
            if (strpos($array[1], '=') !== false) {
                parse_str($array[1], $parameters);
                return array(
                    'url' => $url,
                    'parameters' => $parameters
                );
            }
        }
        return array(
            'url' => '',
            'parameters' => array()
        );
    }
}