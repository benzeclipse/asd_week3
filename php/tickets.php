<?php
 
header('Content-Type: text/xml');
 
echo '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>';
 
echo '<response>';
        $ticket = $_GET['food'];
        $ticketArray = array('Nfl','Nba','Mlb','Tennis','Golf',
        					'nfl', 'nba', 'mlb', 'football', 'baseball', 'nascar', 'Nascar');
        if(in_array($ticket,$ticketArray))
                echo 'We do have '.$ticket.'!';
                elseif($ticket=='')
                        echo 'Enter a sport to see if we have them';
                else
                        echo 'Sorry, we dont have ' .$ticket.'!';
 
echo '</response>';